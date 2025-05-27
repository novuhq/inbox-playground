import { z } from "zod";

export const inAppControlSchema = z.object({
  subscriberFirstName: z.string().default("John"),
  subscriberLastName: z.string().default("Doe"),
  inAppSubject: z
    .string()
    .default(`u/{{subscriber.firstName | capitalize}} replied to your post in r/reactjs`),
  inAppBody: z
    .string()
    .default("Not everything needs to be broken down into an excalidraw diagram"),
  inAppAvatar: z
    .string()
    .default("https://i.redd.it/snoovatar/avatars/3c428706-19a9-48f3-b7ce-cb67f2773e7b.png"),
  showInAppAvatar: z.boolean().default(false),
  inAppPrimaryActionLabel: z.string().default("Reply"),
  enablePrimaryAction: z.boolean().default(false),
  inAppPrimaryActionUrl: z.string().default("https://novu.com"),
  inAppSecondaryActionLabel: z.string().default("Dismiss"),
  enableSecondaryAction: z.boolean().default(false),
  inAppSecondaryActionUrl: z.string().default("https://novu.com"),
});
