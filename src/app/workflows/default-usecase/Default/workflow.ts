import { workflow } from "@novu/framework";
import { payloadSchema } from "./payloadSchema";


const workflowName = "default-notification";

// Define the workflow
export const defaultNotification = workflow(
  workflowName,
  async ({ step, payload }) => {
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
    payloadSchema: payloadSchema
  }
);
