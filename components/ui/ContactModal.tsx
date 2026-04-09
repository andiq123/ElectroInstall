"use client";

import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { type HomeChromeCopy } from "@/lib/homeChrome";
import { BUSINESS_INFO, PHONE_HREF } from "@/lib/constants";
import { ensureEmailjsReady } from "@/lib/emailjs/ensureReady";
import {
  createRequest,
  type NewCrmRequest,
} from "@/lib/firebase/crmRequestsClient";
import type { Locale, Translations } from "@/lib/locales";
import { Input, PhoneInput, Textarea } from "./Input";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ContactModalProps {
  chrome: HomeChromeCopy;
  contactForm: Translations["contact_form"];
  isOpen: boolean;
  locale: Locale;
  onClose: () => void;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactModal({
  chrome,
  contactForm,
  isOpen,
  locale,
  onClose,
}: ContactModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const [formState, setFormState] = useState<FormState>("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement;
    const timer = setTimeout(() => {
      const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
        FOCUSABLE
      );
      firstFocusable?.focus();
    }, 80);

    return () => {
      clearTimeout(timer);
      previousFocusRef.current?.focus();
      previousFocusRef.current = null;
    };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) {
        return;
      }

      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []
      );

      if (focusableElements.length === 0) {
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        last.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === last) {
        first.focus();
        event.preventDefault();
      }
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const validateForm = () => {
    const nextErrors: typeof errors = {};

    if (!name.trim()) {
      nextErrors.name = contactForm.validation.name_required;
    }

    if (!phone.trim()) {
      nextErrors.phone = contactForm.validation.phone_required;
    } else if (phone.replace(/\D/g, "").length < 8) {
      nextErrors.phone = contactForm.validation.phone_invalid;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const input: NewCrmRequest = {
      emailSent: false,
      locale,
      message: message.trim() || "—",
      name: name.trim(),
      phone: phone.trim(),
    };

    setFormState("submitting");

    let emailSent = false;
    if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
      try {
        ensureEmailjsReady(EMAILJS_PUBLIC_KEY);
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          message: input.message,
          name: input.name,
          phone: input.phone,
        });
        emailSent = true;
      } catch (error) {
        console.error("EmailJS error:", error);
      }
    }

    try {
      await createRequest({ ...input, emailSent });
      setFormState("success");
      setTimeout(() => onClose(), 2000);
    } catch (error) {
      console.error("RTDB write failed:", error);
      setFormState("error");
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      aria-modal="true"
      role="dialog"
      aria-label={contactForm.title}
    >
      <div
        className={`modal-backdrop ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        className={`modal-panel-clean ${isOpen ? "modal-enter" : "modal-exit"}`}
      >
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label={chrome.closeDialog}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <header className="mb-10 text-left">
          <h2 className="mb-3 font-display text-[var(--text-h2)] font-semibold leading-[var(--leading-tight)] text-[var(--text-primary)]">
            {contactForm.title}
          </h2>
          <p className="text-[var(--text-body)] leading-[var(--leading-relaxed)] text-[var(--text-secondary)]">
            {contactForm.subtitle}
          </p>
        </header>

        {formState === "success" ? (
          <div className="modal-success" role="status" aria-live="polite">
            <div className="modal-success-icon" aria-hidden="true">
              <svg
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="mb-3 font-display text-[var(--text-h2)] font-semibold text-[var(--text-primary)]">
              {contactForm.success_title}
            </h3>
            <p className="text-[var(--text-body)] text-[var(--text-secondary)]">
              {contactForm.success_subtitle}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <Input
              label={contactForm.name_label}
              placeholder={contactForm.name_placeholder}
              value={name}
              onChange={(event) => setName(event.target.value)}
              error={errors.name}
              required
              disabled={formState === "submitting"}
            />

            <PhoneInput
              label={contactForm.phone_label}
              placeholder={contactForm.phone_placeholder}
              value={phone}
              onChange={setPhone}
              error={errors.phone}
              required
              disabled={formState === "submitting"}
            />

            <Textarea
              label={contactForm.message_label}
              placeholder={contactForm.message_placeholder}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={3}
              disabled={formState === "submitting"}
            />

            {formState === "error" && (
              <div className="modal-error" role="alert">
                <span>{contactForm.error_msg}</span>
              </div>
            )}

            <button
              type="submit"
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-[var(--accent-light)] px-6 py-3 text-[var(--text-small)] font-semibold text-zinc-900 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-50"
              disabled={formState === "submitting"}
            >
              {formState === "submitting" ? (
                <>
                  <span className="modal-spinner" aria-hidden="true" />
                  {contactForm.submitting_btn}
                </>
              ) : (
                contactForm.submit_btn
              )}
            </button>
          </form>
        )}

        <div className="modal-quick-call">
          <span>{contactForm.quick_call}</span>
          <a href={PHONE_HREF} className="modal-phone-link">
            {BUSINESS_INFO.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
