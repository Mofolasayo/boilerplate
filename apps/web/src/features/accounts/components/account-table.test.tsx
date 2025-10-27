import React from "react";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AccountTable } from "@/features/accounts/components/account-table";
import type { Account } from "@/types/accounts";
import { renderWithProviders } from "@/lib/test-utils";

const mockAccounts = [
  {
    id: "1",
    name: "Operating",
    currency: "USD",
    tenantId: "tenant",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as Account,
];

describe("AccountTable", () => {
  it("renders account rows", () => {
    renderWithProviders(<AccountTable data={mockAccounts} />);

    expect(screen.getByText("Operating")).toBeInTheDocument();
    expect(screen.getByText("USD")).toBeInTheDocument();
  });
});
