import type { PropsWithChildren } from "react";

import { AppHeader } from "@/components/layout/app-header";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-8 sm:px-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
