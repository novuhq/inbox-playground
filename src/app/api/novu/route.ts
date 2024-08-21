import { serve } from "@novu/framework/next";

import { inboxDemo } from "../../workflows/inbox-demo/workflow";

export const { GET, POST, OPTIONS } = serve({
  workflows: [inboxDemo],
});
