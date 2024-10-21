import { test, expect } from "@playwright/test";

test("loads inbox playground", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".nv-notificationList")).toBeVisible();
  await expect(page.locator(".nv-inboxStatus__title")).toBeVisible();
});

test("new notification notice is visible", async ({ page }) => {
  const newPage = await page.context().newPage();
  await newPage.goto("/");

  await newPage.waitForLoadState("networkidle");

  await newPage.locator("[data-testid='send-notification-button']").click();

  await newPage.locator(".nv-notificationListNewNotificationsNotice__button").click();

  await newPage.waitForSelector(".nv-notificationListNewNotificationsNotice__button", {
    state: "hidden",
    timeout: 5000,
  });

  await newPage.locator("[data-testid='send-notification-button']").click();
  await newPage.waitForSelector(".nv-notificationListNewNotificationsNotice__button", {
    state: "visible",
    timeout: 5000,
  });
});
