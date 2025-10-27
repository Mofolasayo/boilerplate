import { Banknote, Building, UserRoundCog } from "lucide-react";

import { DataCard } from "@/components/layout/data-card";

export const DataGrid = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <DataCard
        icon={Building}
        title="Active tenants"
        primaryValue="128"
        secondaryValue="Up 4.2% this month"
      />

      <DataCard
        icon={UserRoundCog}
        title="Invited members"
        primaryValue="512"
        secondaryValue="32 pending"
      />

      <DataCard
        icon={Banknote}
        title="Monthly revenue"
        primaryValue="$42,120"
        secondaryValue="MRR across all tenants"
      />
    </div>
  );
};
