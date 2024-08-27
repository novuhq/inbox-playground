import { z } from "zod";

export const payloadSchema = z.object({
  mainActorFirstName: z.string().default("John"),
  mainActorLastName: z.string().default("Doe"),
  inAppSubject: z.string().default("In-App Notification Subject!"),
  pageName: z.string().default("Very Intresting Page"),
  mainActorAvatar: z.string().default("https://avatars.githubusercontent.com/u/63902456?v=4"),
  showInAppAvatar: z.boolean().default(true),
  inAppPrimaryActionLabel: z.string().default("Reply"),
  enablePrimaryAction: z.boolean().default(true),
  inAppPrimaryActionUrl: z.string().default("https://novu.com"),
});