import { redirect } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFeatureFlag } from "@/lib/flags";
import { getTenantContext } from "@/lib/auth/session";
import { getTenantSubscription } from "@/features/billing/api/billing-service";

const BillingPage = async () => {
  if (!getFeatureFlag("billing")) {
    redirect("/dashboard");
  }

  const tenant = getTenantContext();
  const subscription = await getTenantSubscription({ tenantId: tenant.tenantId });

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
          {subscription ? (
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
