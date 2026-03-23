import { firebaseClientApp } from "@/lib/firebase/client";
import { getDatabase, push, ref, set, update, get, remove } from "firebase/database";
import type { CrmLocale, CrmRequest, CrmRequestStatus } from "@/lib/crm/types";
import { CRM_REQUESTS_RTD_PATH } from "@/lib/crm/env";

function db() {
  if (!firebaseClientApp) throw new Error("Firebase not configured.");
  return getDatabase(firebaseClientApp);
}

export type NewCrmRequest = {
  name: string;
  phone: string;
  message: string;
  locale: CrmLocale;
  emailSent: boolean;
};

export async function createRequest(input: NewCrmRequest): Promise<void> {
  const newRef = push(ref(db(), CRM_REQUESTS_RTD_PATH));
  const id = newRef.key;
  if (!id) throw new Error("Failed to allocate RTDB key.");

  const record: CrmRequest = {
    id,
    name: input.name,
    phone: input.phone,
    message: input.message,
    locale: input.locale,
    emailSent: input.emailSent,
    createdAt: new Date().toISOString(),
    status: "new",
  };

  await set(newRef, record);
}

export async function listRequests(): Promise<CrmRequest[]> {
  const snap = await get(ref(db(), CRM_REQUESTS_RTD_PATH));
  const data = snap.val() as Record<string, CrmRequest> | null;
  if (!data) return [];

  return Object.values(data)
    .filter((r): r is CrmRequest => r != null && typeof r === "object")
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export type CrmRequestUpdate = {
  name: string;
  phone: string;
  message: string;
  status: CrmRequestStatus;
};

export async function updateRequest(id: string, input: CrmRequestUpdate): Promise<void> {
  const payload: Record<string, string | null> = {
    name: input.name.trim(),
    phone: input.phone.trim(),
    message: input.message.trim(),
    status: input.status,
    reviewedAt: input.status === "reviewed" ? new Date().toISOString() : null,
  };
  await update(ref(db(), `${CRM_REQUESTS_RTD_PATH}/${id}`), payload);
}

export async function deleteRequest(id: string): Promise<void> {
  await remove(ref(db(), `${CRM_REQUESTS_RTD_PATH}/${id}`));
}
