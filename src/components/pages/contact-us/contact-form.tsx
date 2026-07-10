"use client";

import { ArrowRight } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import InlineSpinner from "@/components/inline-spinner";
import { submitContactForm } from "@/services/contact/contact.service";

const labelCls =
  "font-dm-mono text-[11px] uppercase tracking-[0.16em] text-dr-text-3";
const fieldCls =
  "w-full rounded-[12px] border bg-dr-surface px-[15px] py-[13px] text-[15px] text-dr-text outline-none transition-colors placeholder:text-dr-text-3 focus:border-dr-red";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    null,
  );

  useEffect(() => {
    if (state && !state.success && "message" in state && state.message) {
      toast.error(state.message);
    } else if (state?.success && "message" in state && state.message) {
      toast.success(state.message);
    }
  }, [state]);

  // Extract field-specific errors if available
  const rawErrors =
    state && "errors" in state && state.errors ? state.errors : [];
  const fieldErrors = rawErrors.reduce(
    (acc, err) => {
      acc[String(err.field)] = err.message;
      return acc;
    },
    {} as Record<string, string>,
  );
  const hasErrors = state && !state.success;

  const borderFor = (field: string) =>
    fieldErrors[field] ? "border-dr-red" : "border-dr-bd-3";

  return (
    <div className="rounded-[18px] border border-dr-bd-2 bg-dr-surface p-8 md:p-10">
      <form action={formAction} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <label className="flex flex-col gap-[7px]">
            <span className={labelCls}>Full Name</span>
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              required
              className={`${fieldCls} ${borderFor("name")}`}
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
            />
            {fieldErrors.name && (
              <span
                id="name-error"
                className="text-[12.5px] text-dr-red"
                role="alert"
              >
                {fieldErrors.name}
              </span>
            )}
          </label>

          <label className="flex flex-col gap-[7px]">
            <span className={labelCls}>Email Address</span>
            <input
              name="email"
              type="email"
              placeholder="john@example.com"
              required
              className={`${fieldCls} ${borderFor("email")}`}
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
            {fieldErrors.email && (
              <span
                id="email-error"
                className="text-[12.5px] text-dr-red"
                role="alert"
              >
                {fieldErrors.email}
              </span>
            )}
          </label>
        </div>

        <label className="flex flex-col gap-[7px]">
          <span className={labelCls}>Subject</span>
          <input
            name="subject"
            type="text"
            placeholder="How can we help you?"
            required
            className={`${fieldCls} ${borderFor("subject")}`}
            aria-invalid={!!fieldErrors.subject}
            aria-describedby={fieldErrors.subject ? "subject-error" : undefined}
          />
          {fieldErrors.subject && (
            <span
              id="subject-error"
              className="text-[12.5px] text-dr-red"
              role="alert"
            >
              {fieldErrors.subject}
            </span>
          )}
        </label>

        <label className="flex flex-col gap-[7px]">
          <span className={labelCls}>Message</span>
          <textarea
            name="message"
            placeholder="Tell us more about your inquiry..."
            required
            rows={6}
            className={`${fieldCls} resize-none ${borderFor("message")}`}
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
          />
          {fieldErrors.message && (
            <span
              id="message-error"
              className="text-[12.5px] text-dr-red"
              role="alert"
            >
              {fieldErrors.message}
            </span>
          )}
        </label>

        {/* Aria-live region for form status announcements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {hasErrors &&
            state &&
            "message" in state &&
            state.message &&
            `Error: ${state.message}`}
          {isPending && "Sending message..."}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="dr-red-grad inline-flex w-full items-center justify-center gap-2.5 rounded-[9px] px-[26px] py-3.5 font-poppins text-sm font-semibold text-white shadow-[0_10px_26px_rgba(239,43,69,0.35)] transition-opacity disabled:opacity-70"
        >
          {isPending ? (
            <>
              <InlineSpinner size="sm" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <ArrowRight className="h-[15px] w-[15px]" strokeWidth={2.5} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
