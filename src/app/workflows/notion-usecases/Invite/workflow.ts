import { workflow } from "@novu/framework";
import { payloadSchema } from "./payloadSchema";
import { inAppControlSchema } from "./stepsControlSchema";
import { z } from "zod";


// Define the name for your workflow
const workflowName = "notion-invite-notification";

// Define the workflow
export const notionInviteNotification = workflow(
  workflowName,
  async ({ step, payload, subscriber }) => {
    // Define the step for the workflow
    // -----------------------------------in-app step-------------------------------------------------------------------------
    await step.inApp(
      "In App Step",
      async () => {
        const result: any = {
          subject: payload.inAppSubject || `${subscriber?.firstName} ${subscriber?.lastName} invited you to a meeting`,
          body: payload.inAppBody,
        };

        if (payload.showInAppAvatar) {
          result.avatar = payload.inAppAvatar
        }

        if (payload.enablePrimaryAction) {
          result.primaryAction = {
            label: payload.inAppPrimaryActionLabel,
            url: payload.inAppPrimaryActionUrl,
          };
        }

        if (payload.enableSecondaryAction) {
          result.secondaryAction = {
            label: payload.inAppSecondaryActionLabel,
            url: payload.inAppSecondaryActionUrl,
          };
        }
        return result;
      },
      {
        controlSchema: z.object({
          subscriberFirstName: z.string().default("John"),
          subscriberLastName: z.string().default("Doe"),
          inAppSubject: z.string().default(`${subscriber?.firstName} ${subscriber?.lastName} invited you to`),
          inAppBody: z.string().default("In-App Notification Body!"),
          inAppAvatar: z.string().default("https://avatars.githubusercontent.com/u/63902456?v=4"),
          showInAppAvatar: z.boolean().default(true),
          inAppPrimaryActionLabel: z.string().default("Reply"),
          enablePrimaryAction: z.boolean().default(true),
          inAppPrimaryActionUrl: z.string().default("https://novu.com"),
          inAppSecondaryActionLabel: z.string().default("Dismiss"),
          enableSecondaryAction: z.boolean().default(false),
          inAppSecondaryActionUrl: z.string().default("https://novu.com"),
        }),
      }
    );

    // -----------------------------------payload schema-------------------------------------------------------------------------
  },
  {
    payloadSchema: z.object({
      subscriberFirstName: z.string().default("John"),
      subscriberLastName: z.string().default("Doe"),
      inAppSubject: z.string(),
      inAppBody: z.string().default("In-App Notification Body!"),
      inAppAvatar: z.string().default("https://avatars.githubusercontent.com/u/63902456?v=4"),
      showInAppAvatar: z.boolean().default(true),
      inAppPrimaryActionLabel: z.string().default("Reply"),
      enablePrimaryAction: z.boolean().default(true),
      inAppPrimaryActionUrl: z.string().default("https://novu.com"),
      inAppSecondaryActionLabel: z.string().default("Dismiss"),
      enableSecondaryAction: z.boolean().default(false),
      inAppSecondaryActionUrl: z.string().default("https://novu.com"),
    }),
    // -----------------------------------tags-------------------------------------------------------------------------
    tags: ["Invite"],
  }
);