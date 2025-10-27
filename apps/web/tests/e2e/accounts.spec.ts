import { test, expect } from "@playwright/test";

test("accounts page shows filters", async ({ page }) => {
  await page.goto("/dashboard/accounts", {
    waitUntil: "networkidle",
  });

  await expect(page.getByText("Accounts")).toBeVisible();
  await expect(page.getByPlaceholder("Filter by name…")).toBeVisible();
});
