import { workflow } from "@novu/framework";
import { payloadSchema } from "./payloadSchema";

const workflowName = "notion-suggestion-notification";

// Define the workflow
export const notionSuggestionNotification = workflow(
  workflowName,
  async ({ step, payload }) => {
    await step.inApp(
      "In App Step",
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
    payloadSchema: payloadSchema,
    tags: ["Suggestion"],
  }
);
