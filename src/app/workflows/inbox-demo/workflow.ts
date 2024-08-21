import { workflow } from "@novu/framework";
import { renderEmail } from "./email-templates/react-email-template";
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
const workflowName = 'Inbox Demo';

// Define the workflow
export const inboxDemo = workflow(
  workflowName,
  async ({ step, payload, subscriber}) => {
    // Define the step for the workflow
    // -----------------------------------in-app step-------------------------------------------------------------------------
    await step.inApp(
      'In App Step',
      async () => {
        const result: any = {
          subject: `Hello ${subscriber?.firstName} ${subscriber?.lastName}`,
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
      }
    );

    // -----------------------------------payload schema-------------------------------------------------------------------------
  },
  {
    payloadSchema: payloadSchema,
  },
  // -----------------------------------tags-------------------------------------------------------------------------
);

