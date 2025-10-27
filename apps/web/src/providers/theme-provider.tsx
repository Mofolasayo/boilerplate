"use client";

import React from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";

type ThemeProviderProps = PropsWithChildren<{
  defaultTheme?: "light" | "dark" | "system";
}>;

export const ThemeProvider = ({ children, defaultTheme = "system" }: ThemeProviderProps) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme={defaultTheme} enableSystem>
      {children}
    </NextThemeProvider>
  );
};
