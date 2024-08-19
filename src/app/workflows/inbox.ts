import { workflow } from "@novu/framework";
import { z } from "zod";

export const inboxWorkflow = workflow(
  "inbox-demo-workflow",
  async ({ step, payload }) => {
    await step.inApp("send-inbox-notification", async (controls) => {
      return {
        subject: payload.subject,
        body: payload.body,
        ...(payload.showAvatar && {
          avatar: payload.avatar,
        }),
        ...(payload.showPrimaryAction && {
          primaryAction: {
            label: payload.primaryActionLabel,
            url: payload.primaryActionUrl,
          },
        }),
        ...(payload.showSecondaryAction && {
          secondaryAction: {
            label: payload.secondaryActionLabel,
            url: payload.secondaryActionUrl,
          },
        }),
      };
    });
  },
  {
    payloadSchema: z.object({
      subject: z
        .string()
        .default("A Successful Test on Novu from {{userName}}"),
      body: z.string().default("This is a test notification from Novu."),
      avatar: z.string().default("https://i.pravatar.cc/300"),
      showAvatar: z.boolean().default(false),
      primaryActionLabel: z.string().default("View in-app"),
      primaryActionUrl: z.string().default("https://novu.com"),
      showPrimaryAction: z.boolean().default(false),
      secondaryActionLabel: z.string().default("View in-app"),
      secondaryActionUrl: z.string().default("https://novu.com"),
      showSecondaryAction: z.boolean().default(false),
    }),
  }
);
