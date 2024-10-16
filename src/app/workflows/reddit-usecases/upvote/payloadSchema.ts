import { z } from "zod";

export const payloadSchema = z.object({
  subscriberFirstName: z.string().default("John"), 
  subscriberLastName: z.string().default("Doe"),
  inAppSubject: z.string().default("In-App Notification Subject!"),
  inAppBody: z.string().default("In-App Notification Body!"),
  inAppAvatar: z.string().default("https://avatars.githubusercontent.com/u/63902456?v=4"),
  showInAppAvatar: z.boolean().default(true),
  inAppPrimaryActionLabel: z.string().default("Reply"),
  enablePrimaryAction: z.boolean().default(true),
  inAppPrimaryActionUrl: z.string().default("https://novu.com"),
  inAppSecondaryActionLabel: z.string().default("Dismiss"),
  enableSecondaryAction: z.boolean().default(false),
  inAppSecondaryActionUrl: z.string().default("https://novu.com"),
});
