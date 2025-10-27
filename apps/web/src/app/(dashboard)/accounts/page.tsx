import { Suspense } from "react";

import { DataGrid } from "@/components/layout/data-grid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import AccountsClient from "./accounts-client";

const AccountsPage = async () => {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Accounts</h1>
        <p className="text-muted-foreground">
          Manage financial accounts scoped to your current tenant.
        </p>
      </div>

      <DataGrid />

      <Suspense
        fallback={
          <Card>
            <CardHeader>
              <CardTitle>Accounts</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">Loading accounts…</CardContent>
          </Card>
        }
      >
        <AccountsClient />
      </Suspense>
    </div>
  );
};

export default AccountsPage;
