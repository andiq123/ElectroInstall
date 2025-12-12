/**
 * UI Components Index - Centralized exports for all reusable UI components
 * SOLID: Interface Segregation - import only what you need
 */

// Core Components
export { default as Badge } from "./Badge";
export { default as Button } from "./Button";
export { default as Card, GradientBorderCard } from "./Card";
export { default as GradientText } from "./GradientText";
export { default as SectionHeader } from "./SectionHeader";

// Section Dividers
export {
  default as SectionDivider,
  ElectricDivider,
  PulseDivider,
  FlowDivider,
  SparkDivider,
  MinimalDivider,
} from "./SectionDivider";

// Background Effects
export { default as BackgroundEffects, GlowOrb } from "./BackgroundEffects";

// Branding
export { default as Logo, LogoIcon, LogoText } from "./Logo";

// Forms
export { Input, Textarea, PhoneInput } from "./Input";
export { default as ContactModal } from "./ContactModal";
