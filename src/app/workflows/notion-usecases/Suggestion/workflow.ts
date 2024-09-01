import { workflow } from "@novu/framework";
// import { renderEmail } from "./email-templates/react-email-template";
import { payloadSchema } from "./payloadSchema";

const workflowName = "notion-suggestion-notification";

// Define the workflow
export const notionSuggestionNotification = workflow(
  workflowName,
  async ({ step, payload, subscriber }) => {
    // Define the step for the workflow
    // -----------------------------------in-app step-------------------------------------------------------------------------
    await step.inApp(
      "In App Step",
      async (controls) => {
        const result: any = {
          subject: controls.inAppSubject,
          body: controls.pageName,
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
          pageName: z.string().default("Top Secret Project"),
          mainActorAvatar: z
            .string()
            .default(
              "https://i.gifer.com/origin/71/7182930a951a3716d502e6119bcb2334_w200.gif"
            ),
          showInAppAvatar: z.boolean().default(true),
        }),
      }
    );

    // -----------------------------------payload schema-------------------------------------------------------------------------
  },
  {
    payloadSchema: payloadSchema,
    // -----------------------------------tags-------------------------------------------------------------------------
    tags: ["Suggestion"],
  }
);
