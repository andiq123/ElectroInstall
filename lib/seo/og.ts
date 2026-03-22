import { SITE_URL } from "@/lib/constants";

export const OG_IMAGE_PATH = "/male-elictirican-at-the-panel.jpg";

export function absoluteOgImageUrl(): string {
  return new URL(OG_IMAGE_PATH, SITE_URL).toString();
}
