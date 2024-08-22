import { Novu } from '@novu/node'; 

const novu = new Novu(process.env.NOVU_API_KEY || 'default_api_key');

export async function POST(request: Request) {
  const req = await request.json();

  const { subscriberId, firstName, lastName, payload } = req;

  if (subscriberId === "") {
    throw new Error("Subscriber id is required");
  }

  novu.trigger('Inbox Demo', {
  to: {subscriberId, firstName, lastName},
  payload: {...payload}
});

  // await inboxWorkflow.trigger({ to: subscriberId, payload });

  return new Response("Inapp notification sent ✅", {
    status: 200,
  });
}
