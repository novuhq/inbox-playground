import { test, expect } from "@playwright/test";

test("loads inbox playground", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator(".nv-notificationList")).toBeVisible();
  await expect(page.locator(".nv-inboxStatus__title")).toBeVisible();
});

test("new notification notice is visible", async ({ page }) => {
  await page.goto("/");

  await page.waitForLoadState("networkidle");

  await page.waitForSelector(".nv-notificationListNewNotificationsNotice__button", {
    state: "visible",
    timeout: 5000,
  });
  await page.locator("[data-testid='send-notification-button']").click();

  await page.locator(".nv-notificationListNewNotificationsNotice__button").click();

  await page.waitForSelector(".nv-notificationListNewNotificationsNotice__button", {
    state: "hidden",
    timeout: 5000,
  });

  await page.locator("[data-testid='send-notification-button']").click();
  await page.waitForSelector(".nv-notificationListNewNotificationsNotice__button", {
    state: "visible",
    timeout: 5000,
  });
});
