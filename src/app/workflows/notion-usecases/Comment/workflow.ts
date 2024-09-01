import { workflow } from "@novu/framework";
import { z } from "zod";

const workflowName = "notion-comment-notification";

// Define the workflow
export const notionCommentNotification = workflow(
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
              `${subscriber?.firstName} ${subscriber?.lastName} commented in`
            ),
          inAppBody: z.string().default("Important Page"),
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
    // -----------------------------------tags-------------------------------------------------------------------------
    tags: ["Comment"],
  }
);
