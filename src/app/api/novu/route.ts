// "use server";

import { serve } from "@novu/framework/next";
import { workflows } from "../../workflows/workflows";

export const { GET, POST, OPTIONS } = serve({
  workflows: workflows,
});
