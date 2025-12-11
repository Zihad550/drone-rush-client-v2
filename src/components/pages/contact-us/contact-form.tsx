"use client";

import { Mail, MessageSquare, Send, User } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import InlineSpinner from "@/components/inline-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm } from "@/services/contact/contact.service";

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

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800 md:p-12">
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
          Send Us a Message
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Fill out the form below and we'll respond as soon as possible
        </p>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                className={`pl-8 ${fieldErrors.name ? "border-destructive focus:border-destructive" : ""}`}
                aria-invalid={!!fieldErrors.name}
                aria-describedby={fieldErrors.name ? "name-error" : undefined}
              />
            </div>
            {fieldErrors.name && (
              <p
                id="name-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {fieldErrors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                className={`pl-8 ${fieldErrors.email ? "border-destructive focus:border-destructive" : ""}`}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "email-error" : undefined}
              />
            </div>
            {fieldErrors.email && (
              <p
                id="email-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {fieldErrors.email}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <div className="relative">
            <MessageSquare className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder="How can we help you?"
              required
              className={`pl-8 ${fieldErrors.subject ? "border-destructive focus:border-destructive" : ""}`}
              aria-invalid={!!fieldErrors.subject}
              aria-describedby={
                fieldErrors.subject ? "subject-error" : undefined
              }
            />
          </div>
          {fieldErrors.subject && (
            <p
              id="subject-error"
              className="text-sm text-destructive"
              role="alert"
            >
              {fieldErrors.subject}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Tell us more about your inquiry..."
            required
            rows={6}
            className={`resize-none ${fieldErrors.message ? "border-destructive focus:border-destructive" : ""}`}
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
          />
          {fieldErrors.message && (
            <p
              id="message-error"
              className="text-sm text-destructive"
              role="alert"
            >
              {fieldErrors.message}
            </p>
          )}
        </div>

        {/* Aria-live region for form status announcements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {hasErrors &&
            state &&
            "message" in state &&
            state.message &&
            `Error: ${state.message}`}
          {isPending && "Sending message..."}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="w-full cursor-pointer"
        >
          {isPending ? (
            <>
              <InlineSpinner size="sm" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
