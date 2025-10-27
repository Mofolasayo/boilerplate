"use server";

import { redirect } from "next/navigation";

import { DEFAULT_TENANT_SESSION } from "@/lib/auth/constants";
import { clearTenantSession, setTenantSession } from "@/lib/auth/session";
import type { TenantSession } from "@/lib/auth/types";

const sanitizeInput = (value: FormDataEntryValue | null, fallback: string) => {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
};

export async function signInWithDemoTenant(formData: FormData) {
  const redirectTo = sanitizeInput(formData.get("redirectTo"), "/dashboard");
  const tenantId = sanitizeInput(formData.get("tenantId"), DEFAULT_TENANT_SESSION.tenantId);
  const tenantName = sanitizeInput(formData.get("tenantName"), DEFAULT_TENANT_SESSION.tenantName);
  const email = sanitizeInput(formData.get("email"), DEFAULT_TENANT_SESSION.email);

  const session: TenantSession = {
    ...DEFAULT_TENANT_SESSION,
    tenantId,
    tenantName,
    email,
  };

  setTenantSession(session);

  redirect(redirectTo);
}

export async function signOut() {
  clearTenantSession();
  redirect("/sign-in");
}
