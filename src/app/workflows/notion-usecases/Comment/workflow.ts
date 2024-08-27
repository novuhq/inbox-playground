import { workflow } from "@novu/framework";
// import { renderEmail } from "./email-templates/react-email-template";
import { payloadSchema } from './payloadSchema';
import {
  emailControlSchema,
  pushControlSchema,
  inAppControlSchema,
  smsControlSchema,
  chatControlSchema,
  digestControlSchema,
  delayControlSchema,
} from './stepsControlSchema';

const workflowName = 'Notion Comment Notification';

// Define the workflow
export const notionCommentNotification = workflow(
  workflowName,
  async ({ step, payload, subscriber }) => {
    // Define the step for the workflow
    // -----------------------------------in-app step-------------------------------------------------------------------------
    await step.inApp(
      'In App Step',
      async (controls) => {
        const result: any = {
          subject: `${subscriber?.firstName} ${subscriber?.lastName} commented in`,
          body: payload.pageName,
          primaryAction: {
            label: "Reply",
            url: controls.inAppPrimaryActionUrl,
          },
        }

        if (payload.showInAppAvatar) {
          result.avatar = payload.mainActorAvatar;
        }

    return result;

  }
);

    // -----------------------------------payload schema-------------------------------------------------------------------------
  },
{
  payloadSchema: payloadSchema,
    // -----------------------------------tags-------------------------------------------------------------------------
    tags: ['Comment']
}
);