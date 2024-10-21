import { test, expect } from "@playwright/test";

test("loads inbox playground", async ({ browser }) => {
  const context = await browser.newContext();
  const newPage = await context.newPage();
  await newPage.goto("/");

  await expect(newPage.locator(".nv-notificationList")).toBeVisible();
  await expect(newPage.locator(".nv-inboxStatus__title")).toBeVisible();
});

test("new notification notice is visible", async ({ browser }) => {
  const context = await browser.newContext();
  const newPage = await context.newPage();
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
