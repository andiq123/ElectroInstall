import emailjs from "@emailjs/browser";

let initializedForKey: string | null = null;

export function ensureEmailjsReady(publicKey: string): void {
  if (!publicKey || initializedForKey === publicKey) return;
  emailjs.init(publicKey);
  initializedForKey = publicKey;
}
