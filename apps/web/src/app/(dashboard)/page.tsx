"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTenantSession } from "@/providers/tenant-session-provider";

const DashboardPage = () => {
  const tenant = useTenantSession();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back, {tenant.tenantName}</h1>
        <p className="text-muted-foreground">
          You&apos;re viewing the{" "}
          <code className="bg-muted rounded-md px-1.5 py-0.5 text-xs">{tenant.tenantId}</code>{" "}
          tenant. Wire your feature modules to this context to ensure isolation across tenants.
        </p>
        {tenant.isMock && (
          <p className="text-muted-foreground text-xs">
            Using the default mock session. Replace the sign-in flow to connect to your identity
            provider.
          </p>
        )}
      </div>

      <Tabs defaultValue="summary">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>MRR</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-semibold">$42,000</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Tenants</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-semibold">128</CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Data Freshness</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-semibold">12 mins</CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent events</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Hook up your activity feed module here. Until then, this is a stub for navigation
              flow.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
