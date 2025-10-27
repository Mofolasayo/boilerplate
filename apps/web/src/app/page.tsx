import Link from "next/link";
import { ArrowRight, Building2, Layers, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Building2,
    title: "Tenant aware by design",
    description:
      "Isolated auth, database schemas, and feature flags let you ship SaaS experiences confidently.",
  },
  {
    icon: Layers,
    title: "Feature-first architecture",
    description:
      "Modular folders, typed APIs, and shared UI primitives (Shadcn) keep your dashboard maintainable.",
  },
  {
    icon: ShieldCheck,
    title: "Production-ready workflow",
    description:
      "Testing (Vitest & Playwright), logging, metrics, and deployment docs are set up out of the box.",
  },
];

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background via-background to-muted px-6 py-20">
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <span className="mb-3 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Tenant Dashboard Template
        </span>
        <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">
          Ship multi-tenant SaaS apps faster with a batteries-included Next.js starter.
        </h1>
        <p className="mt-4 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
          This template distills lessons from finance dashboards and Cal.com into a modern stack:
          App Router, Drizzle ORM, Shadcn UI, Hono APIs, feature flags, tests, logging, and more.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/sign-in">
              Get Started
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/dashboard">Explore Dashboard</Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link href="/docs">View Documentation</Link>
          </Button>
        </div>
      </section>

      <section className="mt-16 grid w-full max-w-5xl gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="border-border/50">
            <CardHeader className="space-y-2">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                <feature.icon className="size-5 text-primary" />
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
};

export default Home;
