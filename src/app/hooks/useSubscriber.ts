import { useEffect, useState } from "react";
import { createId } from "@paralleldrive/cuid2";

export const useSubscriber = () => {
  const [subscriberId, setSubscriberId] = useState(
    localStorage.getItem("inbox_demo_subscriberId")
  );

  useEffect(() => {
    if (!subscriberId) {
      const newSubscriberId = createId();
      localStorage.setItem("inbox_demo_subscriberId", newSubscriberId);
      setSubscriberId(newSubscriberId);
    }

    // Note: We're not using the first and last name here, but keeping them for potential future use
  }, []);

  return { subscriberId };
};
