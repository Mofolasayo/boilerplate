import React from "react";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";

import { AppProviders } from "@/providers/app-providers";
import { DEFAULT_TENANT_SESSION } from "@/lib/auth/constants";

export const renderWithProviders = (ui: ReactElement) => {
  return render(
    <AppProviders tenantSession={{ ...DEFAULT_TENANT_SESSION, isMock: false }}>{ui}</AppProviders>,
  );
};
