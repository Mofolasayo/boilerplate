import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface DataCardProps {
  icon: LucideIcon;
  title: string;
  primaryValue: string | number;
  secondaryValue?: string;
  trendLabel?: string;
  className?: string;
}

export const DataCard = ({
  icon: Icon,
  title,
  primaryValue,
  secondaryValue,
  trendLabel,
  className,
}: DataCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium">{title}</CardTitle>
        <Icon className="text-muted-foreground size-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{primaryValue}</div>
        {secondaryValue && <p className="text-muted-foreground text-xs">{secondaryValue}</p>}
        {trendLabel && <p className="text-muted-foreground text-xs">{trendLabel}</p>}
      </CardContent>
    </Card>
  );
};
