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
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-8 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm md:p-12">
      {/* Hexagonal border overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 400 300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hex-border"
              x="0"
              y="0"
              width="50"
              height="43.3"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="25,0 50,14.43 50,43.3 25,57.73 0,43.3 0,14.43"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-border)" />
          <title>Hexagonal border pattern</title>
        </svg>
      </div>

      <form action={formAction} className="relative z-10 space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <div className="absolute left-2 top-2.5 rounded-full bg-primary/10 p-1">
                <User className="h-4 w-4 text-primary" />
              </div>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
                className={`pl-10 transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary),0.3)] ${fieldErrors.name ? "border-destructive focus:border-destructive" : "focus:border-primary"}`}
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
              <div className="absolute left-2 top-2.5 rounded-full bg-primary/10 p-1">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                className={`pl-10 transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary),0.3)] ${fieldErrors.email ? "border-destructive focus:border-destructive" : "focus:border-primary"}`}
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
            <div className="absolute left-2 top-2.5 rounded-full bg-primary/10 p-1">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
            <Input
              id="subject"
              name="subject"
              type="text"
              placeholder="How can we help you?"
              required
              className={`pl-10 transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary),0.3)] ${fieldErrors.subject ? "border-destructive focus:border-destructive" : "focus:border-primary"}`}
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
            className={`resize-none transition-all duration-300 focus:shadow-[0_0_15px_rgba(var(--primary),0.3)] ${fieldErrors.message ? "border-destructive focus:border-destructive" : "focus:border-primary"}`}
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
          className="w-full cursor-pointer shadow-[0_0_20px_rgba(var(--primary),0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] hover:scale-105"
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
