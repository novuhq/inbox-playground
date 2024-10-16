import axios from "axios";

const NOVU_API_KEY = process.env.NOVU_SECRET_KEY;
const NOVU_API_URL = "https://api.novu.co/v1/events/trigger";

export async function POST(request: Request) {
  const body = await request.json();
  const { workflowId, to, payload, controls, bridgeUrl } = body;

  if (!to.subscriberId) {
    return Response.json(
      { error: "Subscriber id is required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(
      NOVU_API_URL,
      {
        name: workflowId,
        to,
        payload,
        controls: {
          steps: controls,
        },
        bridgeUrl,
      },
      {
        headers: {
          Authorization: `ApiKey ${NOVU_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return Response.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error triggering Novu event:", error);

    return Response.json({ error: "Failed to trigger event" }, { status: 500 });
  }
}
