import type { FormKind } from "./form-validation";

export type InquiryApiResponse = {
  ok: boolean;
  delivered: boolean;
  message: string;
  title?: string;
  errors?: Record<string, string>;
};

export type InquiryPayload = {
  kind: FormKind;
  values: Record<string, string | boolean>;
  submittedAt: string;
  clientIpHash?: string;
};
