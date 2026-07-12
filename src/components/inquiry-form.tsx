"use client";

import { useId, useMemo, useState } from "react";
import {
  getFields,
  validateSubmission,
  type FieldDefinition,
  type FormKind
} from "@/lib/form-validation";
import type { InquiryApiResponse } from "@/lib/api";
import { company } from "@/lib/site-data";

type InquiryFormProps = {
  kind: FormKind;
  title: string;
  description: string;
};

type FormState = {
  status: "idle" | "submitting" | "success" | "warning" | "error";
  title: string;
  message: string;
  errors: Record<string, string>;
};

export function InquiryForm({ kind, title, description }: InquiryFormProps) {
  const idPrefix = useId();
  const fields = useMemo(() => getFields(kind), [kind]);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const [state, setState] = useState<FormState>({
    status: "idle",
    title: "",
    message: "",
    errors: {}
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const rawValues: Record<string, FormDataEntryValue | FormDataEntryValue[] | string | boolean> = {};

    for (const field of fields) {
      rawValues[field.name] =
        field.type === "checkbox"
          ? formData.get(field.name) === "on"
          : field.type === "checkboxGroup"
            ? formData.getAll(field.name)
            : formData.get(field.name) ?? "";
    }

    const localValidation = validateSubmission(kind, rawValues);
    if (!localValidation.ok) {
      setState({
        status: "error",
        title: "Review required",
        message: "Please correct the highlighted fields.",
        errors: localValidation.errors
      });
      return;
    }

    setState({
      status: "submitting",
      title: "Submitting",
      message: "Submitting...",
      errors: {}
    });

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          kind,
          values: localValidation.values,
          middleName: String(formData.get("middleName") ?? ""),
          startedAt
        })
      });
      const result = (await response.json()) as InquiryApiResponse;

      if (!response.ok || !result.ok) {
        setState({
          status: "error",
          title: result.title || "Submission failed",
          message: result.message || "Submission failed. Please email AfriBridge directly.",
          errors: result.errors ?? {}
        });
        return;
      }

      setState({
        status: result.delivered ? "success" : "warning",
        title:
          result.title ||
          (result.delivered ? "Submission sent" : "Delivery not configured"),
        message:
          result.message ||
          "Submission received. AfriBridge AgroTrade will review the information.",
        errors: {}
      });

      if (result.delivered) {
        form.reset();
        setStartedAt(Date.now());
      }
    } catch {
      setState({
        status: "error",
        title: "Network error",
        message: "Network error. Please email AfriBridge directly.",
        errors: {}
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-lg border border-forest-900/10 bg-white/90 p-5 shadow-soft sm:p-6"
    >
      <div className="mb-6">
        <p className="eyebrow">{kind === "buyer" ? "Buyer inquiry" : "Supplier partnership"}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-normal text-navy-950">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-700">{description}</p>
      </div>

      <input
        className="hidden"
        name="middleName"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <input type="hidden" name="startedAt" value={startedAt} readOnly />

      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <FieldControl
            key={field.name}
            field={field}
            id={`${idPrefix}-${field.name}`}
            error={state.errors[field.name]}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-slate-600">
          For time-sensitive requirements, email{" "}
          <a className="font-semibold text-forest-900 underline-offset-4 hover:underline" href={`mailto:${company.primaryEmail}`}>
            {company.primaryEmail}
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={state.status === "submitting"}
          className="focus-ring inline-flex min-h-11 items-center justify-center rounded-lg bg-forest-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {state.status === "submitting" ? "Submitting" : "Submit"}
        </button>
      </div>

      {state.message ? (
        <div
          className={`mt-5 rounded-lg border px-4 py-3 text-sm leading-6 ${
            state.status === "success"
              ? "border-forest-500/30 bg-forest-50 text-forest-900"
              : state.status === "warning"
                ? "border-gold-500/35 bg-gold-100/55 text-navy-950"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
          role="status"
          aria-live="polite"
        >
          <p className="font-semibold">{state.title}</p>
          <p className="mt-1">{state.message}</p>
        </div>
      ) : null}
    </form>
  );
}

function FieldControl({
  field,
  id,
  error
}: {
  field: FieldDefinition;
  id: string;
  error?: string;
}) {
  const baseInputClasses =
    "mt-2 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-navy-950 shadow-sm transition placeholder:text-slate-400 focus:border-forest-700 focus:outline-none focus:ring-2 focus:ring-gold-300";
  const errorId = `${id}-error`;

  if (field.type === "checkbox") {
    return (
      <div className="md:col-span-2">
        <label className="flex gap-3 rounded-lg border border-forest-900/10 bg-warm-50 p-4 text-sm leading-6 text-slate-700">
          <input
            className="mt-1 h-4 w-4 rounded border-slate-300 text-forest-900 focus:ring-gold-300"
            id={id}
            name={field.name}
            type="checkbox"
            aria-describedby={error ? errorId : undefined}
          />
          <span>{field.label}</span>
        </label>
        {error ? (
          <p className="mt-2 text-sm text-red-700" id={errorId}>
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  if (field.type === "checkboxGroup") {
    return (
      <fieldset className="md:col-span-2">
        <legend className="text-sm font-semibold text-navy-950">
          {field.label}
          {field.required ? <span className="text-red-700"> *</span> : null}
        </legend>
        <div
          className="mt-2 grid gap-3 rounded-lg border border-forest-900/10 bg-warm-50 p-4 sm:grid-cols-2"
          aria-describedby={error ? errorId : undefined}
        >
          {field.options?.map((option, index) => {
            const optionId = `${id}-${index}`;

            return (
              <label
                key={option}
                htmlFor={optionId}
                className="flex min-h-11 items-start gap-3 rounded-lg bg-white/70 px-3 py-2 text-sm leading-6 text-slate-700"
              >
                <input
                  className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-forest-900 focus:ring-gold-300"
                  id={optionId}
                  name={field.name}
                  type="checkbox"
                  value={option}
                />
                <span>{option}</span>
              </label>
            );
          })}
        </div>
        {error ? (
          <p className="mt-2 text-sm text-red-700" id={errorId}>
            {error}
          </p>
        ) : null}
      </fieldset>
    );
  }

  return (
    <div className={field.fullWidth ? "md:col-span-2" : undefined}>
      <label htmlFor={id} className="text-sm font-semibold text-navy-950">
        {field.label}
        {field.required ? <span className="text-red-700"> *</span> : null}
        {field.hint ? (
          <span className="ml-2 text-xs font-medium text-slate-500">
            {" "}
            {field.hint}
          </span>
        ) : null}
      </label>
      {field.type === "select" ? (
        <select
          id={id}
          name={field.name}
          required={field.required}
          className={baseInputClasses}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          defaultValue=""
        >
          <option value="" disabled>
            Select
          </option>
          {field.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          id={id}
          name={field.name}
          required={field.required}
          maxLength={field.maxLength}
          rows={5}
          className={baseInputClasses}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
      ) : (
        <input
          id={id}
          name={field.name}
          type={field.type === "email" ? "email" : field.type === "url" ? "url" : "text"}
          required={field.required}
          maxLength={field.maxLength}
          autoComplete={field.autocomplete}
          placeholder={field.placeholder}
          className={baseInputClasses}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
        />
      )}
      {error ? (
        <p className="mt-2 text-sm text-red-700" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
