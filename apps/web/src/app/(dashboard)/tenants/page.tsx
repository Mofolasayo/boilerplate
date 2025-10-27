import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Suspense } from "react";

import TenantsClient from "./tenants-client";

const TenantsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Tenant directory</h1>
        <p className="text-muted-foreground">
          Browse and manage the tenants associated with your account.
        </p>
      </div>
      <Suspense
        fallback={
          <Card>
            <CardHeader>
              <CardTitle>Loading tenants…</CardTitle>
            </CardHeader>
          </Card>
        }
      >
        <TenantsClient />
      </Suspense>
    </div>
  );
};

export default TenantsPage;
