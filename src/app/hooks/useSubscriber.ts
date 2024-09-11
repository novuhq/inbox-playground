"use client";

import { useEffect, useState } from "react";
import { createId } from "@paralleldrive/cuid2";

export const useSubscriber = () => {
  const [subscriberId, setSubscriberId] = useState<string | null>(null);
  const [isNewSubscriber, setIsNewSubscriber] = useState(false);

  useEffect(() => {
    const storedSubscriberId = localStorage.getItem("inbox_demo_subscriberId");
    const workflowsTriggered = localStorage.getItem("workflows_triggered");

    if (!storedSubscriberId) {
      const newSubscriberId = createId();
      localStorage.setItem("inbox_demo_subscriberId", newSubscriberId);
      setSubscriberId(newSubscriberId);
      setIsNewSubscriber(true);
    } else {
      setSubscriberId(storedSubscriberId);
    }

    if (!workflowsTriggered) {
      setIsNewSubscriber(true);
    }
  }, []);

  return { subscriberId, isNewSubscriber };
};
