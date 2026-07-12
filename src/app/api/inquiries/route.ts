import { NextResponse } from "next/server";
import { deliverInquiry } from "@/lib/form-delivery";
import { validateSubmission, type FormKind } from "@/lib/form-validation";
import {
  clientIpHash,
  hasValidSubmissionTiming,
  isAllowedOrigin,
  looksSpammy,
  rateLimit
} from "@/lib/request-guards";
import type { InquiryApiResponse, InquiryPayload } from "@/lib/api";

const maxPayloadBytes = 32_000;

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return json(
      {
        ok: false,
        delivered: false,
        title: "Request blocked",
        message: "This form can only be submitted from an approved AfriBridge website origin."
      },
      403
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > maxPayloadBytes) {
    return json(
      {
        ok: false,
        delivered: false,
        title: "Submission too large",
        message: "Submission is too large."
      },
      413
    );
  }

  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json(
      {
        ok: false,
        delivered: false,
        title: "Invalid request",
        message: "Invalid request format."
      },
      400
    );
  }

  if (typeof body.middleName === "string" && body.middleName.trim()) {
    return json({
      ok: true,
      delivered: false,
      title: "Submission received",
      message: "Submission received."
    });
  }

  const kind = body.kind === "supplier" ? "supplier" : body.kind === "buyer" ? "buyer" : null;
  if (!kind) {
    return json(
      {
        ok: false,
        delivered: false,
        title: "Invalid request",
        message: "Unknown form type."
      },
      400
    );
  }

  if (!hasValidSubmissionTiming(body.startedAt)) {
    return json(
      {
        ok: false,
        delivered: false,
        title: "Please try again",
        message: "Please refresh the page and submit the form again."
      },
      400
    );
  }

  const ipHash = clientIpHash(request);
  const limit = rateLimit(ipHash);
  if (!limit.allowed) {
    return json(
      {
        ok: false,
        delivered: false,
        title: "Too many attempts",
        message: "Too many submissions were received. Please wait and try again."
      },
      429,
      {
        "retry-after": String(limit.retryAfterSeconds)
      }
    );
  }

  const values =
    body.values && typeof body.values === "object"
      ? (body.values as Record<string, string | boolean | string[]>)
      : {};
  const validation = validateSubmission(kind as FormKind, values);

  if (!validation.ok) {
    return json(
      {
        ok: false,
        delivered: false,
        title: "Review required",
        message: "Please correct the highlighted fields.",
        errors: validation.errors
      },
      422
    );
  }

  if (looksSpammy(validation.values)) {
    return json(
      {
        ok: false,
        delivered: false,
        title: "Review required",
        message: "The submission could not be accepted. Please remove promotional links and try again."
      },
      422
    );
  }

  const payload: InquiryPayload = {
    kind,
    values: validation.values,
    submittedAt: new Date().toISOString(),
    clientIpHash: ipHash
  };

  const delivery = await deliverInquiry(payload);
  if (!delivery.configured) {
    return json(
      {
        ok: true,
        delivered: false,
        title: "Validated, delivery not configured",
        message:
          "Your details passed validation, but form email delivery is not configured yet. Please email the AfriBridge team directly."
      },
      202
    );
  }

  if (!delivery.ok) {
    return json(
      {
        ok: false,
        delivered: false,
        title: "Delivery failed",
        message: "The form could not be delivered. Please email the AfriBridge team directly."
      },
      502
    );
  }

  return json({
    ok: true,
    delivered: true,
    title: "Submission sent",
    message: "Submission received. AfriBridge AgroTrade will review the information."
  });
}

function json(
  body: InquiryApiResponse,
  status = 200,
  headers: Record<string, string> = {}
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
      ...headers
    }
  });
}
