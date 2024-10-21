import { test, expect } from "@playwright/test";

test("loads inbox playground", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".nv-notificationList")).toBeVisible();
  await expect(page.locator(".nv-inboxStatus__title")).toBeVisible();
});
