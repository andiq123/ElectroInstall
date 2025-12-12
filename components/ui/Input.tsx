"use client";

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

// ============================================
// INPUT COMPONENT
// ============================================

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, success, icon, className = "", ...props }, ref) => {
    return (
      <div className="input-wrapper">
        {label && (
          <label className="input-label">
            <span className="input-label-indicator" />
            {label}
            {props.required && <span className="input-required">*</span>}
          </label>
        )}
        <div className="input-container">
          {icon && <span className="input-icon">{icon}</span>}
          <input
            ref={ref}
            className={`input-field ${icon ? "has-icon" : ""} ${error ? "input-error" : ""} ${success ? "input-success" : ""} ${className}`}
            {...props}
          />
        </div>
        {error && <span className="input-error-text">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

// ============================================
// TEXTAREA COMPONENT
// ============================================

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  success?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, success, className = "", ...props }, ref) => {
    return (
      <div className="input-wrapper">
        {label && (
          <label className="input-label">
            <span className="input-label-indicator" />
            {label}
            {props.required && <span className="input-required">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          className={`input-field textarea-field ${error ? "input-error" : ""} ${success ? "input-success" : ""} ${className}`}
          {...props}
        />
        {error && <span className="input-error-text">{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

// ============================================
// PHONE INPUT WITH FORMATTING
// ============================================

interface PhoneInputProps extends Omit<InputProps, "type" | "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Allow only numbers, spaces, +, and -
      const cleaned = e.target.value.replace(/[^\d\s+-]/g, "");
      onChange(cleaned);
    };

    return (
      <Input
        ref={ref}
        type="tel"
        value={value}
        onChange={handleChange}
        icon={
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        }
        {...props}
      />
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export default Input;
