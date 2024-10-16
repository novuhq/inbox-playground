import { z } from "zod";

export const inAppControlSchema = z.object({
  subscriberFirstName: z.string().default("John"),
  subscriberLastName: z.string().default("Doe"),
  inAppSubject: z
    .string()
    .default(
      `u/{{subscriber.firstName | capitalize}} replied to your comment in r/ProgrammerHumor`
    ),
  inAppBody: z
    .string()
    .default("you thought you had edge cases covered..you thought"),
  inAppAvatar: z
    .string()
    .default("https://avatars.githubusercontent.com/u/63902456?v=4"),
  showInAppAvatar: z.boolean().default(true),
  inAppPrimaryActionLabel: z.string().default("Reply back"),
  enablePrimaryAction: z.boolean().default(true),
  inAppPrimaryActionUrl: z.string().default("https://novu.com"),
  inAppSecondaryActionLabel: z.string().default("Dismiss"),
  enableSecondaryAction: z.boolean().default(false),
  inAppSecondaryActionUrl: z.string().default("https://novu.com"),
});