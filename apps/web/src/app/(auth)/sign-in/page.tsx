import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEFAULT_TENANT_SESSION } from "@/lib/auth/constants";
import { signInWithDemoTenant } from "@/lib/auth/actions";
import { getTenantContext } from "@/lib/auth/session";

type SignInPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

const SignInPage = ({ searchParams }: SignInPageProps) => {
  const tenant = getTenantContext();

  if (!tenant.isMock) {
    redirect("/dashboard");
  }

  const redirectTo =
    typeof searchParams?.redirect_url === "string" && searchParams.redirect_url.length > 0
      ? searchParams.redirect_url
      : "/dashboard";

  return (
    <Card className="border-border/40 w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold">Sign in</CardTitle>
        <CardDescription>
          This demo form seeds a mock session cookie. Replace it with your identity provider once
          you wire up real authentication.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form className="space-y-4" action={signInWithDemoTenant}>
          <input type="hidden" name="redirectTo" value={redirectTo} />

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="admin@acme.com"
              defaultValue={DEFAULT_TENANT_SESSION.email}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tenantId">Tenant ID</Label>
            <Input
              id="tenantId"
              name="tenantId"
              placeholder="tenant_demo"
              defaultValue={DEFAULT_TENANT_SESSION.tenantId}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tenantName">Tenant name</Label>
            <Input
              id="tenantName"
              name="tenantName"
              placeholder="Demo Tenant"
              defaultValue={DEFAULT_TENANT_SESSION.tenantName}
              required
            />
          </div>

          <Button className="w-full">Continue with demo tenant</Button>
        </form>

        <p className="text-muted-foreground text-center text-sm">
          New here?{" "}
          <Link href="/sign-up" className="text-primary underline-offset-4 hover:underline">
            Scaffold your onboarding flow in <code>app/(auth)/sign-up</code>.
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignInPage;
