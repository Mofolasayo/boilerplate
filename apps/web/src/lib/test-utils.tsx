import React from "react";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";

import { AppProviders } from "@/providers/app-providers";
import { DEFAULT_TENANT_SESSION } from "@/lib/auth/constants";
import type { TenantSession } from "@/lib/auth/types";

export const renderWithProviders = (ui: ReactElement) => {
  const session: TenantSession = { ...DEFAULT_TENANT_SESSION };

  return render(<AppProviders initialTenantSession={session}>{ui}</AppProviders>);
};
