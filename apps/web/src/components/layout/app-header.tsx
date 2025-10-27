"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/auth/actions";
import { useTenantSession } from "@/providers/tenant-session-provider";
import { cn } from "@/lib/utils";
import { useFeatureFlag } from "@/lib/flags";

export const AppHeader = () => {
  const pathname = usePathname();
  const tenant = useTenantSession();
  const [pending, startTransition] = useTransition();
  const billingEnabled = useFeatureFlag("billing");
  const marketplaceEnabled = useFeatureFlag("marketplace");

  const navLinks = [
    { href: "/dashboard", label: "Overview", enabled: true },
    { href: "/dashboard/tenants", label: "Tenants", enabled: true },
    { href: "/dashboard/billing", label: "Billing", enabled: billingEnabled },
    { href: "/dashboard/marketplace", label: "Marketplace", enabled: marketplaceEnabled },
  ].filter((link) => link.enabled);

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut();
    });
  };

  return (
    <header className="bg-background/75 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <Link href="/dashboard" className="font-semibold">
              {tenant.tenantName}
            </Link>
            <span className="text-muted-foreground text-xs">
              {tenant.email} · {tenant.roles.join(", ")}
              {tenant.isMock ? " · mock session" : ""}
            </span>
          </div>

          <nav className="hidden items-center gap-2 text-sm font-medium md:flex">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "hover:text-primary rounded-full px-3 py-1.5 transition-colors",
                  pathname?.startsWith(href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground",
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button size="sm" variant="outline">
            Invite User
          </Button>
          <Button size="sm" variant="ghost" onClick={handleSignOut} disabled={pending}>
            {pending ? "Signing out…" : "Sign out"}
          </Button>
        </div>
      </div>
    </header>
  );
};
