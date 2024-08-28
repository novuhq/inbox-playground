import { z } from "zod";
import { CronExpression } from "@novu/framework";

export const emailControlSchema = z.object({
  subject: z.string().default("A Successful Test on Novu!"),
  showHeader: z.boolean().default(true),
  components: z
    .array(
      z.object({
        type: z.enum(["heading", "text", "button", "code", "users"]),
        text: z.string().default(""),
        align: z.enum(["left", "center", "right"]).default("left"),
      }),
    )
    .default([
      {
        type: "heading",
        text: "Welcome to Novu",
        align: "center",
      },
      {
        type: "text",
        text: "Congratulations on receiving your first notification email from Novu! Join the hundreds of thousands of developers worldwide who use Novu to build notification platforms for their products.",
        align: "left",
      },
      {
        type: "users",
        align: "center",
        text: "",
      },
      {
        type: "text",
        text: "Ready to get started? Click on the button below, and you will see first-hand how easily you can edit this email content.",
        align: "left",
      },
      {
        type: "button",
        text: "Edit Email",
        align: "center",
      },
    ]),
});

export const inAppControlSchema = z.object({
  inAppSubject: z.string().default("In-App Notification Subject!"),
  inAppBody: z.string().default("In-App Notification Body!"),
  inAppAvatar: z.string().default("https://avatars.githubusercontent.com/u/63902456?v=4"),
  showInAppAvatar: z.boolean().default(true),
  inAppPrimaryActionLabel: z.string().default("Primary Action"),
  enablePrimaryAction: z.boolean().default(true),
  inAppPrimaryActionUrl: z.string().default("https://novu.com"),
  inAppSecondaryActionLabel: z.string().default("Secondary Action"),
  enableSecondaryAction: z.boolean().default(false),
  inAppSecondaryActionUrl: z.string().default("https://novu.com"),
});

export const smsControlSchema = z.object({
  smsBody: z.string().default("SMS Notification Subject"),
});

export const pushControlSchema = z.object({
  pushSubject: z.string().default("Push Notification Subject"),
  pushBody: z.string().default("Push Notification Body"),
});

export const chatControlSchema = z.object({
  chatBody: z.string().default("Chat Notification Body"),
});

export const delayControlSchema = z.object({
  unit: z.enum(["seconds", "minutes", "hours", "days", "weeks", "months"]).default("days"),
  amount: z.number().default(2),
});

export const digestControlSchema = z.object({
  strategy: z.enum(["Regular", "Scheduled"]).default("Regular"),
  lookBackWindow: z.boolean().default(false),
  digestKey: z.string().default("digestKey"),
  unit: z.enum(["seconds", "minutes", "hours", "days", "weeks", "months"]).default("days"),
  amount: z.number().default(3),
  cron: z.string().default(CronExpression.EVERY_DAY_AT_8AM), // visit https://crontab.guru/ to set the cron expression.
});

export const customControlSchema = z.object({
});