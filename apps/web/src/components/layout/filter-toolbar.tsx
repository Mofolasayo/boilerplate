"use client";

import { Filter, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface FilterToolbarProps {
  onCreate?: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  className?: string;
  actionLabel?: string;
}

export const FilterToolbar = ({
  onCreate,
  searchValue,
  onSearchChange,
  className,
  actionLabel = "Add",
}: FilterToolbarProps) => {
  return (
    <div
      className={cn("bg-card flex flex-wrap items-center gap-3 rounded-lg border p-4", className)}
    >
      <div className="flex flex-1 items-center gap-2">
        <Filter className="text-muted-foreground size-4" />
        <Input
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Filter by name…"
          className="max-w-xs"
        />
      </div>

      <Separator orientation="vertical" className="hidden h-6 md:block" />

      <div className="flex items-center gap-2">
        {onCreate && (
          <Button size="sm" onClick={onCreate}>
            <Plus className="size-4" />
            <span className="ml-2 hidden sm:inline">{actionLabel}</span>
          </Button>
        )}
      </div>
    </div>
  );
};
