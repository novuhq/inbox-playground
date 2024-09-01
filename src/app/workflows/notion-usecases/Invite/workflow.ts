import { workflow } from "@novu/framework";
import { payloadSchema } from "./payloadSchema";

// Define the name for your workflow
const workflowName = "notion-invite-notification";

// Define the workflow
export const notionInviteNotification = workflow(
  workflowName,
  async ({ step, payload, subscriber }) => {
    // Define the step for the workflow
    // -----------------------------------in-app step-------------------------------------------------------------------------
    await step.inApp("In App Step", async () => {
      const result: any = {
        subject: `${subscriber?.firstName} ${subscriber?.lastName} invited you to a page`,
        body: payload.pageName,
      };

      if (payload.showInAppAvatar) {
        result.avatar = payload.mainActorAvatar;
      }

      return result;
    });

    // -----------------------------------payload schema-------------------------------------------------------------------------
  },
  {
    payloadSchema: payloadSchema,
    // -----------------------------------tags-------------------------------------------------------------------------
    tags: ["Invite"],
  }
);
