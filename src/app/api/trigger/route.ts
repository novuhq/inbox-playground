import { Novu } from "@novu/node";

const novu = new Novu(process.env.NOVU_API_KEY || "default_api_key");

export async function POST(request: Request) {
  const body = await request.json();

  const { to, payload, workflowId } = body;

  if (to.subscriberId === "") {
    throw new Error("Subscriber id is required");
  }

  const response = await novu.trigger(workflowId, {
    to,
    payload,
  });

  return new Response(response.data, {
    status: 200,
  });
}
