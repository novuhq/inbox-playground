import { useEffect, useState } from "react";
import { createId } from "@paralleldrive/cuid2";

export const useSubscriber = () => {
  const [subscriberId, setSubscriberId] = useState("");

  useEffect(() => {
    const subscriberIdFromLocalStorage = localStorage.getItem(
      "inbox_demo_subscriberId"
    );
    const firstNameFromLocalStorage = localStorage.getItem(
      "inbox_demo_firstName"
    );
    const lastNameFromLocalStorage = localStorage.getItem(
      "inbox_demo_lastName"
    );

    if (subscriberIdFromLocalStorage) {
      setSubscriberId(subscriberIdFromLocalStorage);
    } else {
      const newSubscriberId = createId();
      localStorage.setItem("inbox_demo_subscriberId", newSubscriberId);
      setSubscriberId(newSubscriberId);
    }

    // Note: We're not using the first and last name here, but keeping them for potential future use
  }, []);

  return { subscriberId };
};
