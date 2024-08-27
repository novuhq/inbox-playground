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


// Define the name for your workflow 
const workflowName = 'Notion Invite Notification';

// Define the workflow
export const notionInviteNotification = workflow(
  workflowName,
  async ({ step, payload, subscriber }) => {
    // Define the step for the workflow
    // -----------------------------------in-app step-------------------------------------------------------------------------
    await step.inApp(
      'In App Step-1',
      async () => {
        const result: any = {
          subject: `Dima Grossman invited you to a page`,
          body: payload.inAppBody,
        };
        return result;
        
      }
    );

    // -----------------------------------payload schema-------------------------------------------------------------------------
  },
  {
    payloadSchema: payloadSchema,
    // -----------------------------------tags-------------------------------------------------------------------------
    tags: ['Invite']
  }
);

