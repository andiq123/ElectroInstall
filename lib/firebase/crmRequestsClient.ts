import { firebaseClientApp } from "@/lib/firebase/client";
import { getDatabase, push, ref, set, update, get } from "firebase/database";
import type { CrmLocale, CrmRequest, CrmRequestStatus } from "@/lib/crm/types";
import { CRM_REQUESTS_RTD_PATH } from "@/lib/crm/env";

function isoNow(): string {
  return new Date().toISOString();
}

function getDb() {
  if (!firebaseClientApp) {
    throw new Error("Firebase client is not configured.");
  }
  return getDatabase(firebaseClientApp);
}

export type CreateCrmRequestForRtdbInput = {
  name: string;
  phone: string;
  message: string;
  locale: CrmLocale;
  emailSent: boolean;
};

export async function createCrmRequestInRtdb(
  input: CreateCrmRequestForRtdbInput
): Promise<CrmRequest> {
  const db = getDb();
  const requestsRef = ref(db, CRM_REQUESTS_RTD_PATH);
  const nextRef = push(requestsRef);

  const id = nextRef.key;
  if (!id) throw new Error("Failed to create RTDB key.");

  const request: CrmRequest = {
    id,
    name: input.name.trim(),
    phone: input.phone.trim(),
    message: input.message.trim(),
    locale: input.locale,
    emailSent: input.emailSent,
    createdAt: isoNow(),
    status: "new",
  };

  await set(nextRef, request);
  return request;
}

export async function listCrmRequestsFromRtdb(
  limit = 200
): Promise<CrmRequest[]> {
  const db = getDb();
  const snap = await get(ref(db, CRM_REQUESTS_RTD_PATH));
  const data = snap.val() as Record<string, CrmRequest> | null;
  if (!data) return [];

  return Object.values(data)
    .filter((r) => r && typeof r === "object")
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, limit);
}

export async function updateCrmRequestStatusInRtdb(
  id: string,
  status: CrmRequestStatus,
  adminNotes?: string
): Promise<CrmRequest> {
  const db = getDb();
  const requestRef = ref(db, `${CRM_REQUESTS_RTD_PATH}/${id}`);
  const snap = await get(requestRef);
  if (!snap.exists()) throw new Error("Request not found.");

  const existing = snap.val() as CrmRequest;

  const patch: Partial<CrmRequest> = {
    status,
    reviewedAt: status === "reviewed" ? isoNow() : undefined,
  };

  const cleanedNotes = typeof adminNotes === "string" ? adminNotes.trim() : "";
  if (cleanedNotes) patch.adminNotes = cleanedNotes;
  else patch.adminNotes = undefined;

  await update(requestRef, {
    status: patch.status,
    reviewedAt: patch.reviewedAt ?? null,
    adminNotes: patch.adminNotes ?? null,
  });

  return {
    ...existing,
    ...patch,
    reviewedAt: status === "reviewed" ? patch.reviewedAt : undefined,
    adminNotes: cleanedNotes ? cleanedNotes : undefined,
  } as CrmRequest;
}

