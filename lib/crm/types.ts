export type CrmLocale = "ro" | "ru";
export type CrmRequestStatus = "new" | "reviewed";

export type CrmRequest = {
  id: string;
  name: string;
  phone: string;
  message: string;
  locale: CrmLocale;
  emailSent: boolean;
  createdAt: string;
  status: CrmRequestStatus;
  reviewedAt?: string;
};
