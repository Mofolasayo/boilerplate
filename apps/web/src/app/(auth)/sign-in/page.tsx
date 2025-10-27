"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEFAULT_TENANT_SESSION } from "@/lib/auth/constants";
import type { TenantSession } from "@/lib/auth/types";
import { useTenantSession } from "@/providers/tenant-session-provider";

const sanitizeInput = (value: FormDataEntryValue | null, fallback: string) => {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
};

const SignInPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useTenantSession();
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = useMemo(() => {
    const param = searchParams?.get("redirect_url");
    return param && param.length > 0 ? param : "/dashboard";
  }, [searchParams]);

  useEffect(() => {
    if (!session.isMock) {
      router.replace("/dashboard");
    }
  }, [session.isMock, router]);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (submitting) return;

      setSubmitting(true);

      const formData = new FormData(event.currentTarget);
      const email = sanitizeInput(formData.get("email"), DEFAULT_TENANT_SESSION.email);
      const tenantId = sanitizeInput(formData.get("tenantId"), DEFAULT_TENANT_SESSION.tenantId);
      const tenantName = sanitizeInput(
        formData.get("tenantName"),
        DEFAULT_TENANT_SESSION.tenantName,
      );

      const nextSession: TenantSession = {
        ...DEFAULT_TENANT_SESSION,
        email,
        tenantId,
        tenantName,
      };

      session.setSession(nextSession);
      router.replace(redirectTo);

      setSubmitting(false);
    },
    [redirectTo, session, submitting, router],
  );

  return (
    <Card className="border-border/40 w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold">Sign in</CardTitle>
        <CardDescription>
          This demo form loads a mock session into local storage. Replace it with your identity
          provider once you wire up real authentication.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@acme.com"
              defaultValue={DEFAULT_TENANT_SESSION.email}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tenantId">Tenant ID</Label>
            <Input
              id="tenantId"
              name="tenantId"
              placeholder="tenant_demo"
              defaultValue={DEFAULT_TENANT_SESSION.tenantId}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tenantName">Tenant name</Label>
            <Input
              id="tenantName"
              name="tenantName"
              placeholder="Demo Tenant"
              defaultValue={DEFAULT_TENANT_SESSION.tenantName}
              required
            />
          </div>

          <Button className="w-full" disabled={submitting}>
            {submitting ? "Signing in…" : "Continue with demo tenant"}
          </Button>
        </form>

        <p className="text-muted-foreground text-center text-sm">
          New here?{" "}
          <Link href="/sign-up" className="text-primary underline-offset-4 hover:underline">
            Scaffold your onboarding flow in <code>app/(auth)/sign-up</code>.
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInPage;
