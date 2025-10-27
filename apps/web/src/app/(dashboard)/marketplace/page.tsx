"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFeatureFlag } from "@/lib/flags";

const MarketplacePage = () => {
  const router = useRouter();
  const marketplaceEnabled = useFeatureFlag("marketplace");

  useEffect(() => {
    if (!marketplaceEnabled) {
      router.replace("/dashboard");
    }
  }, [marketplaceEnabled, router]);

  if (!marketplaceEnabled) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">App Marketplace</h1>
        <p className="text-muted-foreground">
          Connect tenant tooling via installable apps and integrations.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming soon</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground text-sm">
          This placeholder demonstrates how to gate entire experiences behind feature flags. Create
          packages under `features/marketplace` to model listing, install flows, and provisioning
          webhooks.
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketplacePage;
