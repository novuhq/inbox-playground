import { z } from "zod";

export const payloadSchema = z.object({
  subscriberFirstName: z.string().default("John"),
  subscriberLastName: z.string().default("Doe"),
  inAppSubject: z.string().default("In-App Notification Subject!"),
  pageName: z.string().default("Happy Hour Planning"),
  mainActorAvatar: z.string().default("https://avatars.githubusercontent.com/u/63902456?v=4"),
  showInAppAvatar: z.boolean().default(true),
});