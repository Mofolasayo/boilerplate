import type { Metadata } from "next";
import localFont from "next/font/local";

import { Toaster } from "@/components/ui/toaster";
import { AppProviders } from "@/providers/app-providers";
import { getTenantContext } from "@/lib/auth/session";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tenant Dashboard Starter",
  description: "Multi-tenant Next.js starter with modular architecture and Shadcn UI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tenantSession = getTenantContext();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProviders tenantSession={tenantSession}>
          {children}
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
