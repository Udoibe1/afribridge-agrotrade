import { getFields, type FormKind } from "./form-validation";
import { company } from "./site-data";
import type { InquiryPayload } from "./api";

type DeliveryResult = {
  configured: boolean;
  ok: boolean;
  provider?: "resend" | "webhook";
};

const resendEndpoint = "https://api.resend.com/emails";

export async function deliverInquiry(payload: InquiryPayload): Promise<DeliveryResult> {
  if (process.env.RESEND_API_KEY) {
    const emailDelivery = await deliverWithResend(payload);
    if (emailDelivery.ok || !process.env.AFRIBRIDGE_FORM_WEBHOOK_URL) {
      return emailDelivery;
    }
  }

  if (process.env.AFRIBRIDGE_FORM_WEBHOOK_URL) {
    return deliverWithWebhook(payload);
  }

  return {
    configured: false,
    ok: false
  };
}

async function deliverWithResend(payload: InquiryPayload): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.AFRIBRIDGE_FORM_FROM;
  const recipients = recipientList();

  if (!apiKey || !from || recipients.length === 0) {
    return {
      configured: false,
      ok: false,
      provider: "resend"
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  const email = buildEmail(payload);

  try {
    const response = await fetch(resendEndpoint, {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        from,
        to: recipients,
        reply_to: email.replyTo,
        subject: email.subject,
        text: email.text,
        html: email.html
      }),
      signal: controller.signal
    });

    return {
      configured: true,
      ok: response.ok,
      provider: "resend"
    };
  } catch {
    return {
      configured: true,
      ok: false,
      provider: "resend"
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function deliverWithWebhook(payload: InquiryPayload): Promise<DeliveryResult> {
  const webhookUrl = process.env.AFRIBRIDGE_FORM_WEBHOOK_URL;
  const parsedUrl = webhookUrl ? safeWebhookUrl(webhookUrl) : null;
  if (!parsedUrl) {
    return {
      configured: false,
      ok: false,
      provider: "webhook"
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(parsedUrl.toString(), {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(process.env.AFRIBRIDGE_FORM_WEBHOOK_TOKEN
          ? {
              authorization: `Bearer ${process.env.AFRIBRIDGE_FORM_WEBHOOK_TOKEN}`
            }
          : {})
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    return {
      configured: true,
      ok: response.ok,
      provider: "webhook"
    };
  } catch {
    return {
      configured: true,
      ok: false,
      provider: "webhook"
    };
  } finally {
    clearTimeout(timeout);
  }
}

function buildEmail(payload: InquiryPayload) {
  const fields = getFields(payload.kind);
  const values = payload.values;
  const companyName = getValue(values.companyName) || "Unknown company";
  const product = getValue(values.product) || "Product not specified";
  const submitter =
    payload.kind === "buyer"
      ? getValue(values.fullName)
      : getValue(values.contactName);
  const replyTo =
    payload.kind === "buyer"
      ? getValue(values.businessEmail)
      : getValue(values.officialEmail);
  const subjectPrefix =
    payload.kind === "buyer" ? "Buyer inquiry" : "Supplier partnership";
  const subject = `AfriBridge ${subjectPrefix}: ${companyName} - ${product}`;
  const lines = [
    `${subjectPrefix.toUpperCase()} SUBMISSION`,
    "",
    `Submitted: ${payload.submittedAt}`,
    `Form: ${payload.kind}`,
    `Reference: ${payload.clientIpHash ?? "not available"}`,
    "",
    ...fields.map((field) => `${field.label}: ${formatValue(values[field.name])}`),
    "",
    "Compliance note:",
    "AfriBridge AgroTrade is an independent trade facilitator. This submission is for review and coordination only."
  ];
  const htmlRows = fields
    .map(
      (field) => `
        <tr>
          <th align="left" style="padding:8px 12px;border-bottom:1px solid #e5dbc9;color:#0a1322;width:32%;">${escapeHtml(field.label)}</th>
          <td style="padding:8px 12px;border-bottom:1px solid #e5dbc9;color:#334155;">${escapeHtml(formatValue(values[field.name]))}</td>
        </tr>`
    )
    .join("");

  return {
    replyTo: replyTo || company.primaryEmail,
    subject,
    text: lines.join("\n"),
    html: `
      <div style="font-family:Arial,sans-serif;color:#0a1322;">
        <h1 style="font-size:20px;">${escapeHtml(subjectPrefix)} submission</h1>
        <p><strong>Submitted by:</strong> ${escapeHtml(submitter || "Not specified")}</p>
        <p><strong>Submitted:</strong> ${escapeHtml(payload.submittedAt)}</p>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:780px;border:1px solid #e5dbc9;">
          ${htmlRows}
        </table>
        <p style="margin-top:18px;color:#475569;">
          AfriBridge AgroTrade is an independent trade facilitator. This submission is for review and coordination only.
        </p>
      </div>`
  };
}

function recipientList(): string[] {
  const configured = process.env.AFRIBRIDGE_FORM_RECIPIENTS;
  const source = configured || `${company.primaryEmail},${company.tradeEmail}`;

  return source
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

function safeWebhookUrl(url: string): URL | null {
  try {
    const parsedUrl = new URL(url);
    if (parsedUrl.protocol !== "https:") {
      return null;
    }
    return parsedUrl;
  } catch {
    return null;
  }
}

function getValue(value: string | boolean | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

function formatValue(value: string | boolean | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "Not provided";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return value || "Not provided";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
