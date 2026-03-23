"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { ensureEmailjsReady } from "@/lib/emailjs/ensureReady";
import { Input, PhoneInput, Textarea } from "./Input";
import { useLanguage } from "@/context/LanguageContext";
import { BUSINESS_INFO, PHONE_HREF } from "@/lib/constants";
import {
  createRequest,
  type NewCrmRequest,
} from "@/lib/firebase/crmRequestsClient";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t, locale } = useLanguage();
  const [shouldRender, setShouldRender] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
  }>({});

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldRender(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const timer = setTimeout(() => {
        setShouldRender(false);
        setFormState("idle");
        setName("");
        setPhone("");
        setMessage("");
        setErrors({});
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleEvents = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
      
      if (e.key === "Tab" && isOpen) {
        const focusableElements = document.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const modalElements = Array.from(focusableElements).filter(el => 
          document.querySelector('.modal-panel-clean')?.contains(el)
        );
        
        if (modalElements.length === 0) return;
        
        const firstElement = modalElements[0] as HTMLElement;
        const lastElement = modalElements[modalElements.length - 1] as HTMLElement;
        
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    },
    [isOpen, onClose]
  );

  const [previousFocus, setPreviousFocus] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreviousFocus(document.activeElement as HTMLElement);
      setTimeout(() => {
        const firstInput = document.querySelector('.modal-panel-clean input') as HTMLElement;
        const closeBtn = document.querySelector('.modal-close-btn') as HTMLElement;
        (firstInput || closeBtn)?.focus();
      }, 100);
    } else if (previousFocus) {
      previousFocus.focus();
    }
  }, [isOpen, previousFocus]);

  useEffect(() => {
    window.addEventListener("keydown", handleEvents);
    return () => window.removeEventListener("keydown", handleEvents);
  }, [handleEvents]);

  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    
    if (!name.trim()) {
      newErrors.name = t.contact_form.validation.name_required;
    }
    
    if (!phone.trim()) {
      newErrors.phone = t.contact_form.validation.phone_required;
    } else if (phone.replace(/\D/g, "").length < 8) {
      newErrors.phone = t.contact_form.validation.phone_invalid;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const input: NewCrmRequest = {
      name: name.trim(),
      phone: phone.trim(),
      message: message.trim() || "—",
      locale,
      emailSent: false,
    };

    setFormState("submitting");

    let emailSent = false;
    if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
      try {
        ensureEmailjsReady(EMAILJS_PUBLIC_KEY);
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          name: input.name,
          phone: input.phone,
          message: input.message,
        });
        emailSent = true;
      } catch (err) {
        console.error("EmailJS error:", err);
      }
    }

    try {
      await createRequest({ ...input, emailSent });
      setFormState("success");
      setTimeout(() => onClose(), 2000);
    } catch (err) {
      console.error("RTDB write failed:", err);
      setFormState("error");
    }
  };

  if (!shouldRender) return null;

  return (
    <div className="modal-overlay" aria-modal="true" role="dialog">
      <div
        className={`modal-backdrop ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div className={`modal-panel-clean ${isOpen ? "modal-enter" : "modal-exit"}`}>
        <button onClick={onClose} className="modal-close-btn" aria-label="Închide">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <header className="text-left mb-10">
          <h2 className="font-display text-[var(--text-h2)] font-semibold text-[var(--text-primary)] leading-[var(--leading-tight)] mb-3">
            {t.contact_form.title}
          </h2>
          <p className="text-[var(--text-body)] text-[var(--text-secondary)] leading-[var(--leading-relaxed)]">
            {t.contact_form.subtitle}
          </p>
        </header>

        {formState === "success" ? (
          <div className="modal-success">
            <div className="modal-success-icon">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-[var(--text-h2)] font-semibold text-[var(--text-primary)] mb-3">{t.contact_form.success_title}</h3>
            <p className="text-[var(--text-body)] text-[var(--text-secondary)]">{t.contact_form.success_subtitle}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t.contact_form.name_label}
              placeholder={t.contact_form.name_placeholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              required
              disabled={formState === "submitting"}
            />

            <PhoneInput
              label={t.contact_form.phone_label}
              placeholder={t.contact_form.phone_placeholder}
              value={phone}
              onChange={setPhone}
              error={errors.phone}
              required
              disabled={formState === "submitting"}
            />

            <Textarea
              label={t.contact_form.message_label}
              placeholder={t.contact_form.message_placeholder}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              disabled={formState === "submitting"}
            />

            {formState === "error" && (
              <div className="modal-error">
                <span>{t.contact_form.error_msg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-[var(--text-small)] font-semibold bg-[var(--accent)] text-[var(--text-inverted)] hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              disabled={formState === "submitting"}
            >
              {formState === "submitting" ? (
                <>
                  <span className="modal-spinner" />
                  {t.contact_form.submitting_btn}
                </>
              ) : (
                t.contact_form.submit_btn
              )}
            </button>
          </form>
        )}

        <div className="modal-quick-call">
          <span>{t.contact_form.quick_call}</span>
          <a href={PHONE_HREF} className="modal-phone-link">
            {BUSINESS_INFO.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
