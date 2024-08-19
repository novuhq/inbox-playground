import { serve } from "@novu/framework/next";

import { inboxWorkflow } from "../../workflows/inbox";

export const { GET, POST, OPTIONS } = serve({
  workflows: [inboxWorkflow],
});
