import { workflow } from "@novu/framework";
import { payloadSchema } from "./payloadSchema";
import { inAppControlSchema } from "./stepsControlSchema";

const workflowName = "notion-suggestion-notification";

export const notionSuggestionNotification = workflow(
  workflowName,
  async ({ step, payload, subscriber }) => {
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
        controlSchema: inAppControlSchema,
      },
    );
  },
  {
    payloadSchema: payloadSchema,
    tags: ["Suggestion"],
  },
);
