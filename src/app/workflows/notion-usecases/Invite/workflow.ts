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
      "in-app-step",
      async (controls) => {
        const result: any = {
          subject: controls.inAppSubject,
          body: controls.inAppBody,
        };

        if (controls.showInAppAvatar) {
          result.avatar = controls.inAppAvatar;
        }

        if (controls.enablePrimaryAction) {
          result.primaryAction = {
            label: controls.inAppPrimaryActionLabel,
            url: controls.inAppPrimaryActionUrl,
          };
        }

        if (controls.enableSecondaryAction) {
          result.secondaryAction = {
            label: controls.inAppSecondaryActionLabel,
            url: controls.inAppSecondaryActionUrl,
          };
        }
        return result;
      },
      {
        controlSchema: z.object({
          subscriberFirstName: z.string().default("John"),
          subscriberLastName: z.string().default("Doe"),
          inAppSubject: z
            .string()
            .default(
              `${subscriber?.firstName} ${subscriber?.lastName} invited you to`
            ),
          inAppBody: z.string().default("In-App Notification Body!"),
          inAppAvatar: z
            .string()
            .default("https://avatars.githubusercontent.com/u/63902456?v=4"),
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
    payloadSchema: z.object({}),
    // -----------------------------------tags-------------------------------------------------------------------------
    tags: ["Invite"],
  }
);
