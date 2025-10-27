"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBilling } from "@/features/billing/hooks/use-billing";
import { useFeatureFlag } from "@/lib/flags";
import { useTenantSession } from "@/providers/tenant-session-provider";

const BillingPage = () => {
  const router = useRouter();
  const tenant = useTenantSession();
  const billingEnabled = useFeatureFlag("billing");
  const { data: subscription, isLoading } = useBilling();

  useEffect(() => {
    if (!billingEnabled) {
      router.replace("/dashboard");
    }
  }, [billingEnabled, router]);

  if (!billingEnabled) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Billing</h1>
        <p className="text-muted-foreground">
          Manage plan, payment method, and invoices for <strong>{tenant.tenantName}</strong>.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {isLoading ? (
            <p className="text-muted-foreground text-sm">Loading subscription…</p>
          ) : subscription ? (
            <>
              <p className="text-lg font-semibold capitalize">{subscription.plan}</p>
              <p className="text-muted-foreground text-sm">Status: {subscription.status}</p>
              {subscription.renewAt && (
                <p className="text-muted-foreground text-sm">
                  Renews on {new Date(subscription.renewAt).toLocaleDateString()}
                </p>
              )}
            </>
          ) : (
            <p className="text-muted-foreground text-sm">
              No subscription found. Extend `billing-service.ts` to integrate with your billing
              provider.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingPage;
