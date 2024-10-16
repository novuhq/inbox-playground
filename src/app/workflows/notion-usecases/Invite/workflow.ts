import { workflow } from "@novu/framework";
import { payloadSchema } from "./payloadSchema";

// Define the name for your workflow
const workflowName = "notion-invite-notification";

// Define the workflow
export const notionInviteNotification = workflow(
  workflowName,
  async ({ step, payload }) => {
    // Define the step for the workflow
    // -----------------------------------in-app step-------------------------------------------------------------------------
    await step.inApp(
      "in-app-step",
      async () => {
        const result: any = {
          subject: payload.inAppSubject,
          body: payload.inAppBody,
        };

        if (payload.showInAppAvatar) {
          result.avatar = payload.inAppAvatar;
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
    );
  },
  {
    tags: ["Invite"],
    payloadSchema: payloadSchema
  }
);
