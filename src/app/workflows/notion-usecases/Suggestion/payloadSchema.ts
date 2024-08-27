import { z } from "zod";

export const payloadSchema = z.object({
  mainActorFirstName: z.string().default("John"),
  mainActorLastName: z.string().default("Doe"),
  inAppSubject: z.string().default("In-App Notification Subject!"),
  pageName: z.string().default("Top Secret Project"),
  mainActorAvatar: z.string().default("https://i.gifer.com/origin/71/7182930a951a3716d502e6119bcb2334_w200.gif"),
  showInAppAvatar: z.boolean().default(true),
});