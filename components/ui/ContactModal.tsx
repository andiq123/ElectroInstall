"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { Input, PhoneInput, Textarea } from "./Input";
import Button from "./Button";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
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

  // Handle ESC key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleEscape]);

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    
    if (!name.trim()) {
      newErrors.name = "Numele este obligatoriu";
    }
    
    if (!phone.trim()) {
      newErrors.phone = "Telefonul este obligatoriu";
    } else if (phone.replace(/\D/g, "").length < 8) {
      newErrors.phone = "Introduceți un număr valid";
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", { name, phone, message });
      setFormState("success");
      
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch {
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

        {/* Header - Minimal */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
            Solicită un Serviciu
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Te vom contacta în cel mai scurt timp
          </p>
        </div>

        {/* Success State */}
        {formState === "success" ? (
          <div className="modal-success">
            <div className="modal-success-icon">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">Mulțumim!</h3>
            <p className="text-[var(--text-secondary)]">Te vom contacta în curând.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Nume"
              placeholder="Numele dvs."
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              required
              disabled={formState === "submitting"}
            />

            <PhoneInput
              label="Telefon"
              placeholder="+373 XXX XXX XXX"
              value={phone}
              onChange={setPhone}
              error={errors.phone}
              required
              disabled={formState === "submitting"}
            />

            <Textarea
              label="Mesaj (opțional)"
              placeholder="Descrieți problema sau serviciul..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              disabled={formState === "submitting"}
            />

            {formState === "error" && (
              <div className="modal-error">
                <span>Eroare. Încercați din nou.</span>
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
                  Se trimite...
                </>
              ) : (
                "Trimite Cererea"
              )}
            </Button>
          </form>
        )}

        {/* Quick Call */}
        <div className="modal-quick-call">
          <span>Sau sună:</span>
          <a href="tel:+373061110314" className="modal-phone-link">
            +373 061110314
          </a>
        </div>
      </div>
    </div>
  );
}
