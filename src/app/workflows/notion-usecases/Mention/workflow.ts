import { workflow } from "@novu/framework";
// import { renderEmail } from "./email-templates/react-email-template";
import { payloadSchema } from "./payloadSchema";
import { z } from "zod";
const workflowName = "notion-mention-notification";

// Define the workflow
export const notionMentionNotification = workflow(
  workflowName,
  async ({ step, payload, subscriber }) => {
    // Define the step for the workflow
    // -----------------------------------in-app step-------------------------------------------------------------------------
    await step.inApp(
      "in-app-step",
      async (controls) => {
        const result: any = {
          subject: controls.inAppSubject,
          body: controls.pageName,
          primaryAction: {
            label: "Reply",
            url: controls.inAppPrimaryActionUrl,
          },
        };

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
          pageName: z.string().default("Very Interesting Page"),
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
    payloadSchema: payloadSchema,
    // -----------------------------------tags-------------------------------------------------------------------------
    tags: ["Mention"],
  }
);
