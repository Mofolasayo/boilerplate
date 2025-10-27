"use client";

import { useMemo, useState } from "react";

import { FilterToolbar } from "@/components/layout/filter-toolbar";
import { AccountTable } from "@/features/accounts/components/account-table";
import { useAccounts } from "@/features/accounts/hooks/use-accounts";

const AccountsClient = () => {
  const { data = [], isLoading, isError } = useAccounts();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return data;
    const value = search.toLowerCase();
    return data.filter((account) => account.name.toLowerCase().includes(value));
  }, [data, search]);

  if (isLoading) {
    return <p className="text-muted-foreground text-sm">Loading accounts…</p>;
  }

  if (isError) {
    return (
      <p className="text-destructive text-sm">
        Failed to load accounts. Check your API configuration.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <FilterToolbar
        onCreate={() => console.log("open create account")}
        searchValue={search}
        onSearchChange={setSearch}
        actionLabel="New account"
      />

      <AccountTable data={filtered} />
    </div>
  );
};

export default AccountsClient;
