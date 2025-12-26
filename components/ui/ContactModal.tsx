"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { Input, PhoneInput, Textarea } from "./Input";
import Button from "./Button";
import { useLanguage } from "@/context/LanguageContext";
import { BUSINESS_INFO } from "@/lib/constants";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t } = useLanguage();
  const [shouldRender, setShouldRender] = useState(false);
  const [formState, setFormState] = useState<FormState>("idle");
  
  // Form fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  // Validation errors
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
  }>({});

  // Handle modal rendering with animation
  useEffect(() => {
    if (isOpen) {
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

  // Handle ESC key and Focus Trapping
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
      setPreviousFocus(document.activeElement as HTMLElement);
      // Give it a small delay to ensure it's rendered
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

  // Form validation
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

  // Form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormState("submitting");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, phone, message }),
      });

      if (!response.ok) {
        throw new Error("API call failed");
      }

      const data = await response.json();
      console.log("Form submitted success:", data);
      setFormState("success");
      
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Submission error:", error);
      setFormState("error");
    }
  };

  if (!shouldRender) return null;

  return (
    <div className="modal-overlay" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div
        className={`modal-backdrop ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Panel - Cleaner Design */}
      <div className={`modal-panel-clean ${isOpen ? "modal-enter" : "modal-exit"}`}>
        {/* Close Button */}
        <button onClick={onClose} className="modal-close-btn" aria-label="Închide">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header - Premium */}
        <div className="text-left mb-12">
          <h2 className="text-4xl sm:text-5xl font-black text-[var(--text-primary)] mb-4 tracking-tighter italic uppercase">
            {t.contact_form.title}
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-medium">
            {t.contact_form.subtitle}
          </p>
        </div>

        {/* Success State */}
        {formState === "success" ? (
          <div className="modal-success">
            <div className="modal-success-icon">
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-4xl font-black text-[var(--text-primary)] mb-4 tracking-tighter uppercase italic">{t.contact_form.success_title}</h3>
            <p className="text-lg text-[var(--text-secondary)] font-medium">{t.contact_form.success_subtitle}</p>
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

            <Button
              type="submit"
              variant="primary"
              className="w-full"
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
            </Button>
          </form>
        )}

        {/* Quick Call */}
        <div className="modal-quick-call">
          <span>{t.contact_form.quick_call}</span>
          <a href={`tel:${BUSINESS_INFO.phone.replace(/\s/g, "")}`} className="modal-phone-link">
            {BUSINESS_INFO.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
