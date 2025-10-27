import { DEFAULT_TENANT_SESSION } from "@/lib/auth/constants";
import type { Account } from "@/types/accounts";
import type {
  PlanTier,
  Tenant,
  TenantMember,
  TenantSubscription,
  TenantSubscriptionStatus,
} from "@/types/tenants";

const iso = (date: string) => new Date(date).toISOString();

const asSubscription = (
  tenantId: string,
  plan: PlanTier,
  status: TenantSubscriptionStatus,
  renewAt?: string | null,
): TenantSubscription => ({
  id: `${tenantId}-subscription`,
  tenantId,
  plan,
  status,
  renewAt: renewAt ? iso(renewAt) : null,
  createdAt: iso("2023-01-01T12:00:00Z"),
});

export const TENANTS: Tenant[] = [
  {
    id: DEFAULT_TENANT_SESSION.tenantId,
    name: DEFAULT_TENANT_SESSION.tenantName,
    slug: "demo-tenant",
    status: "active",
    plan: "growth",
    createdAt: iso("2023-01-01T00:00:00Z"),
    updatedAt: iso("2024-08-01T09:30:00Z"),
  },
  {
    id: "tenant_growth",
    name: "Growth Labs",
    slug: "growth-labs",
    status: "trial",
    plan: "free",
    createdAt: iso("2023-06-15T10:00:00Z"),
    updatedAt: iso("2024-07-20T14:45:00Z"),
  },
];

export const TENANT_MEMBERS: TenantMember[] = [
  {
    id: "member-demo-1",
    tenantId: DEFAULT_TENANT_SESSION.tenantId,
    userId: DEFAULT_TENANT_SESSION.userId,
    email: DEFAULT_TENANT_SESSION.email,
    role: "owner",
    createdAt: iso("2023-01-02T08:00:00Z"),
  },
  {
    id: "member-growth-1",
    tenantId: "tenant_growth",
    userId: DEFAULT_TENANT_SESSION.userId,
    email: DEFAULT_TENANT_SESSION.email,
    role: "admin",
    createdAt: iso("2023-07-01T08:30:00Z"),
  },
  {
    id: "member-growth-2",
    tenantId: "tenant_growth",
    userId: "user_analyst",
    email: "analyst@growthlabs.dev",
    role: "analyst",
    createdAt: iso("2023-07-02T11:15:00Z"),
  },
];

export const TENANT_SUBSCRIPTIONS: TenantSubscription[] = [
  asSubscription(DEFAULT_TENANT_SESSION.tenantId, "growth", "active", "2024-12-01T00:00:00Z"),
  asSubscription("tenant_growth", "free", "trial"),
];

export const ACCOUNTS: Account[] = [
  {
    id: "account-demo-operating",
    tenantId: DEFAULT_TENANT_SESSION.tenantId,
    name: "Operating account",
    currency: "USD",
    createdAt: iso("2023-01-05T09:00:00Z"),
  },
  {
    id: "account-demo-savings",
    tenantId: DEFAULT_TENANT_SESSION.tenantId,
    name: "Savings account",
    currency: "USD",
    createdAt: iso("2023-01-10T09:00:00Z"),
  },
  {
    id: "account-growth-operating",
    tenantId: "tenant_growth",
    name: "Operating account",
    currency: "EUR",
    createdAt: iso("2023-07-12T10:00:00Z"),
  },
];
