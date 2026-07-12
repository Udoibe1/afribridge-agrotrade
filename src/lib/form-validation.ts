import { products } from "./site-data";

export type FormKind = "buyer" | "supplier";

export type FieldType =
  | "text"
  | "email"
  | "url"
  | "select"
  | "textarea"
  | "checkbox";

export type FieldDefinition = {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  maxLength?: number;
  options?: readonly string[];
  fullWidth?: boolean;
  autocomplete?: string;
  placeholder?: string;
};

export type ValidationResult = {
  ok: boolean;
  values: Record<string, string | boolean>;
  errors: Record<string, string>;
};

const countries = [
  "Africa",
  "East African market",
  "Central African market",
  "North African market",
  "Southern African market",
  "Other African market"
];
const incoterms = ["EXW", "FCA", "FOB", "CFR", "CIF", "DAP", "Other"];
const quantityUnits = ["MT", "KG", "Liters", "Containers", "Other"];
const paymentInstruments = [
  "Letter of credit",
  "SBLC",
  "Documentary collection",
  "Bank transfer",
  "To be discussed"
];
const readiness = ["Yes", "No", "In progress"];
const supplierRoles = [
  "Producer",
  "Exporter",
  "Trader",
  "Authorized representative"
];
const documentAvailability = [
  "Company registration documents",
  "Product specification sheets",
  "Authorization documents where applicable",
  "Export history or references",
  "To be discussed"
];

export const buyerFields: readonly FieldDefinition[] = [
  {
    name: "fullName",
    label: "Full name",
    type: "text",
    required: true,
    maxLength: 100,
    autocomplete: "name"
  },
  {
    name: "companyName",
    label: "Company name",
    type: "text",
    required: true,
    maxLength: 140,
    autocomplete: "organization"
  },
  {
    name: "businessEmail",
    label: "Business email",
    type: "email",
    required: true,
    maxLength: 160,
    autocomplete: "email"
  },
  {
    name: "phone",
    label: "Phone / WhatsApp",
    type: "text",
    required: true,
    maxLength: 45,
    autocomplete: "tel"
  },
  {
    name: "country",
    label: "Country",
    type: "select",
    required: true,
    options: countries
  },
  {
    name: "product",
    label: "Product",
    type: "select",
    required: true,
    options: products
  },
  {
    name: "requiredQuantity",
    label: "Required quantity",
    type: "text",
    required: true,
    maxLength: 80,
    placeholder: "Example: 12,500"
  },
  {
    name: "quantityUnit",
    label: "Quantity unit",
    type: "select",
    required: true,
    options: quantityUnits
  },
  {
    name: "destinationPort",
    label: "Destination port",
    type: "text",
    required: true,
    maxLength: 120
  },
  {
    name: "preferredIncoterm",
    label: "Preferred Incoterm",
    type: "select",
    required: true,
    options: incoterms
  },
  {
    name: "deliverySchedule",
    label: "Required delivery schedule",
    type: "text",
    required: true,
    maxLength: 140
  },
  {
    name: "paymentInstrument",
    label: "Preferred payment instrument",
    type: "select",
    required: true,
    options: paymentInstruments
  },
  {
    name: "loiIcpoAbility",
    label: "Ability to issue LOI or ICPO",
    type: "select",
    required: true,
    options: readiness
  },
  {
    name: "companyWebsite",
    label: "Company website",
    type: "url",
    required: false,
    maxLength: 200,
    autocomplete: "url"
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    required: true,
    maxLength: 1200,
    fullWidth: true
  },
  {
    name: "consent",
    label:
      "I consent to AfriBridge AgroTrade reviewing this information for trade facilitation purposes.",
    type: "checkbox",
    required: true,
    fullWidth: true
  }
] as const;

export const supplierFields: readonly FieldDefinition[] = [
  {
    name: "contactName",
    label: "Contact name",
    type: "text",
    required: true,
    maxLength: 100,
    autocomplete: "name"
  },
  {
    name: "companyName",
    label: "Company name",
    type: "text",
    required: true,
    maxLength: 140,
    autocomplete: "organization"
  },
  {
    name: "officialEmail",
    label: "Official company email",
    type: "email",
    required: true,
    maxLength: 160,
    autocomplete: "email"
  },
  {
    name: "companyWebsite",
    label: "Company website",
    type: "url",
    required: true,
    maxLength: 200,
    autocomplete: "url"
  },
  {
    name: "country",
    label: "Country",
    type: "text",
    required: true,
    maxLength: 100
  },
  {
    name: "product",
    label: "Product",
    type: "select",
    required: true,
    options: products
  },
  {
    name: "productOrigin",
    label: "Product origin",
    type: "text",
    required: true,
    maxLength: 120
  },
  {
    name: "supplierRole",
    label: "Producer, exporter, trader, or authorized representative",
    type: "select",
    required: true,
    options: supplierRoles
  },
  {
    name: "availableVolume",
    label: "Available volume",
    type: "text",
    required: true,
    maxLength: 100
  },
  {
    name: "minimumOrderQuantity",
    label: "Minimum order quantity",
    type: "text",
    required: true,
    maxLength: 100
  },
  {
    name: "exportMarkets",
    label: "Export markets",
    type: "text",
    required: true,
    maxLength: 180
  },
  {
    name: "supportedIncoterms",
    label: "Supported Incoterms",
    type: "text",
    required: true,
    maxLength: 120
  },
  {
    name: "acceptedPaymentMethods",
    label: "Accepted payment methods",
    type: "text",
    required: true,
    maxLength: 180
  },
  {
    name: "documentAvailability",
    label: "Supporting document availability",
    type: "select",
    required: true,
    options: documentAvailability
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    required: true,
    maxLength: 1200,
    fullWidth: true
  },
  {
    name: "consent",
    label:
      "I consent to AfriBridge AgroTrade reviewing this information for supplier qualification purposes.",
    type: "checkbox",
    required: true,
    fullWidth: true
  }
] as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const hasDigitPattern = /\d/;

export function getFields(kind: FormKind): readonly FieldDefinition[] {
  return kind === "buyer" ? buyerFields : supplierFields;
}

export function validateSubmission(
  kind: FormKind,
  raw: Record<string, FormDataEntryValue | string | boolean | null | undefined>
): ValidationResult {
  const errors: Record<string, string> = {};
  const values: Record<string, string | boolean> = {};
  const fields = getFields(kind);

  for (const field of fields) {
    const rawValue = raw[field.name];

    if (field.type === "checkbox") {
      const checked =
        rawValue === true || rawValue === "true" || rawValue === "on";
      values[field.name] = checked;

      if (field.required && !checked) {
        errors[field.name] = "Consent is required.";
      }
      continue;
    }

    const value = sanitizeValue(String(rawValue ?? ""), field.type);
    values[field.name] = value;

    if (field.required && !value) {
      errors[field.name] = `${field.label} is required.`;
      continue;
    }

    if (!value) {
      continue;
    }

    if (field.maxLength && value.length > field.maxLength) {
      errors[field.name] = `${field.label} must be ${field.maxLength} characters or fewer.`;
      continue;
    }

    if (field.type === "email" && !emailPattern.test(value)) {
      errors[field.name] = "Enter a valid business email address.";
      continue;
    }

    if (field.type === "url") {
      const normalizedUrl = normalizeUrl(value);
      if (!normalizedUrl) {
        errors[field.name] = "Enter a valid website URL using http or https.";
        continue;
      }
      values[field.name] = normalizedUrl;
    }

    if (field.type === "select" && field.options && !field.options.includes(value)) {
      errors[field.name] = "Select a valid option.";
      continue;
    }

    if (
      ["requiredQuantity", "availableVolume", "minimumOrderQuantity"].includes(
        field.name
      ) &&
      !hasDigitPattern.test(value)
    ) {
      errors[field.name] = `${field.label} must include a number.`;
    }
  }

  return {
    ok: Object.keys(errors).length === 0,
    values,
    errors
  };
}

export function sanitizeValue(value: string, type: FieldType): string {
  const withoutControls = value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, " ")
    .replace(/\s+/g, type === "textarea" ? " " : " ");

  return withoutControls.trim();
}

function normalizeUrl(value: string): string | null {
  const candidate = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(value)
    ? value
    : `https://${value}`;

  try {
    const url = new URL(candidate);
    if (!["http:", "https:"].includes(url.protocol)) {
      return null;
    }
    if (!url.hostname.includes(".") && url.hostname !== "localhost") {
      return null;
    }
    return url.toString();
  } catch {
    return null;
  }
}
