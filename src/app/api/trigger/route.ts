import { inboxWorkflow } from "@/app/workflows/inbox";

export async function POST(request: Request) {
  const req = await request.json();

  const { subscriberId, payload } = req;

  if (subscriberId === "") {
    throw new Error("Subscriber id is required");
  }

  await inboxWorkflow.trigger({ to: subscriberId, payload });

  return new Response("Inapp notification sent ✅", {
    status: 200,
  });
}
