"use client";

import { Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useListTenants } from "@/features/tenants/api/use-list-tenants";
import type { TenantWithSubscription } from "@/types/tenants";

const TenantsClient = () => {
  const { data, isLoading, isError } = useListTenants();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tenant directory</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground flex items-center gap-2">
          <Loader2 className="size-4 animate-spin" /> Loading tenants…
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tenant directory</CardTitle>
        </CardHeader>
        <CardContent className="text-destructive text-sm">
          Unable to load tenants. Check your API configuration.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tenant directory</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {data.map((tenant: TenantWithSubscription) => (
          <div key={tenant.id} className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">{tenant.name}</p>
              <p className="text-muted-foreground text-sm">{tenant.slug}</p>
            </div>
            <div className="text-muted-foreground text-right text-sm">
              <p>{tenant.subscription?.plan ?? tenant.plan}</p>
              <p>Status: {tenant.subscription?.status ?? tenant.status}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default TenantsClient;
