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

const workflowName = 'notion-suggestion-notification';

// Define the workflow
export const notionSuggestionNotification = workflow(
  workflowName,
  async ({ step, payload, subscriber }) => {
    // Define the step for the workflow
    // -----------------------------------in-app step-------------------------------------------------------------------------
    await step.inApp(
      'In App Step',
      async () => {
        const result: any = {
          subject: `${subscriber?.firstName} ${subscriber?.lastName} suggested in`,
          body: payload.pageName,
        };

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
    tags: ['Suggestion']
  }
);
