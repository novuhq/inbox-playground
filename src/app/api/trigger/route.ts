"use server";

import axios from "axios";
import { z } from "zod";
import { workflows } from "../../workflows/workflows";

const NOVU_API_KEY = process.env.NOVU_SECRET_KEY;
const NOVU_API_URL = "https://api.novu.co/v1/events/trigger";

// The bridge URL is fixed server-side; never taken from the request body.
const BRIDGE_URL = "https://inbox-playground.vercel.app/api/novu";

const ALLOWED_WORKFLOW_IDS = workflows.map((workflow) => workflow.id) as [string, ...string[]];

// Client subscriber ids are a cuid2 (see useSubscriber) suffixed with the theme id.
const SUBSCRIBER_ID_PATTERN = /^[a-z0-9]{20,32}_(default-theme|notion|reddit)$/;

const triggerSchema = z.object({
  workflowId: z.enum(ALLOWED_WORKFLOW_IDS),
  to: z.object({
    subscriberId: z.string().regex(SUBSCRIBER_ID_PATTERN),
    firstName: z.string().max(100).optional(),
    lastName: z.string().max(100).optional(),
  }),
  controls: z.record(z.unknown()).optional(),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = triggerSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid trigger request" }, { status: 400 });
  }

  const { workflowId, to, controls } = parsed.data;

  try {
    const response = await axios.post(
      NOVU_API_URL,
      {
        name: workflowId,
        // Rebuilt from validated fields only, so email/phone/data cannot be injected.
        to: {
          subscriberId: to.subscriberId,
          firstName: to.firstName,
          lastName: to.lastName,
        },
        payload: {},
        controls: {
          steps: controls,
        },
        bridgeUrl: BRIDGE_URL,
      },
      {
        headers: {
          Authorization: `ApiKey ${NOVU_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return Response.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error triggering Novu event:", error);

    const status = axios.isAxiosError(error) && error.response ? error.response.status : 500;
    return Response.json({ error: "Failed to trigger event" }, { status });
  }
}
