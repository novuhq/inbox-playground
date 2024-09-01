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

        // Add primary action only if enabled
        if (controls.enablePrimaryAction) {
          result.primaryAction = {
            label: controls.inAppPrimaryActionLabel,
            url: controls.inAppPrimaryActionUrl,
          };
        }

        // Add avatar if enabled
        if (controls.showInAppAvatar) {
          result.avatar = controls.mainActorAvatar;
        }

        return result;
      },
      {
        controlSchema: z.object({
          mainActorFirstName: z.string().default("John"),
          mainActorLastName: z.string().default("Doe"),
          inAppSubject: z.string().default("In-App Notification Subject!"),
          inAppBody: z.string().default("Important Page"),
          mainActorAvatar: z
            .string()
            .default("https://avatars.githubusercontent.com/u/63902456?v=4"),
          showInAppAvatar: z.boolean().default(true),
          inAppPrimaryActionLabel: z.string().default("Reply"),
          enablePrimaryAction: z.boolean().default(true),
          inAppPrimaryActionUrl: z.string().default("https://novu.com"),
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
