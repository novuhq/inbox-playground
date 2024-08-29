import { workflow } from "@novu/framework";
import { z } from "zod";

const workflowName = "notion-comment-notification";

// Define the workflow
export const notionCommentNotification = workflow(
  workflowName,
  async ({ step, payload, subscriber }) => {
    // Define the step for the workflow
    // -----------------------------------in-app step-------------------------------------------------------------------------
    await step.inApp("In App Step", async (controls) => {
      console.log(payload, "PAYLOAD");

      const result: any = {
        subject: payload.inAppSubject,
        body: payload.inAppBody,
      };

      // Add primary action only if enabled
      if (payload.enablePrimaryAction) {
        result.primaryAction = {
          label: payload.inAppPrimaryActionLabel,
          url: payload.inAppPrimaryActionUrl,
        };
      }

      // Add avatar if enabled
      if (payload.showInAppAvatar) {
        result.avatar = payload.mainActorAvatar;
      }

      return result;
    });

    // -----------------------------------payload schema-------------------------------------------------------------------------
  },
  {
    payloadSchema: z.object({
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
    // -----------------------------------tags-------------------------------------------------------------------------
    tags: ["Comment"],
  }
);
