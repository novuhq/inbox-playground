import { useState } from "react";
import { useToast } from "@chakra-ui/react";

export const useNotificationForm = () => {
  const toast = useToast();
  const [notificationFormState, setNotificationFormState] = useState({
    subscriberFirstName: "",
    subscriberLastName: "",
    inAppSubject: "In-App Notification Subject!",
    inAppBody: "In-App Notification Body!",
    inAppAvatar: "https://avatars.githubusercontent.com/u/63902456?v=4",
    showInAppAvatar: true,
    inAppPrimaryActionLabel: "Primary Action",
    enablePrimaryAction: true,
    inAppPrimaryActionUrl: "https://novu.com",
    inAppSecondaryActionLabel: "Secondary Action",
    enableSecondaryAction: false,
    inAppSecondaryActionUrl: "https://novu.com",
    selectedWorkflow: "",
  });

  const handleNotificationFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setNotificationFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    const { subscriberFirstName, subscriberLastName } = notificationFormState;

    if (!subscriberFirstName || !subscriberLastName) {
      toast({
        title: "Missing Information",
        description: "Please fill in both your first and last name.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    localStorage.setItem("inbox_demo_firstName", subscriberFirstName);
    localStorage.setItem("inbox_demo_lastName", subscriberLastName);

    try {
      const response = await fetch("/api/trigger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriberId: localStorage.getItem("inbox_demo_subscriberId"),
          firstName: subscriberFirstName,
          lastName: subscriberLastName,
          payload: {
            ...notificationFormState,
          },
        }),
      });

      if (response.ok) {
        toast({
          title: "Notification sent",
          description: "Your notification was sent successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Failed to send notification",
          description: "Something went wrong while sending the notification.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "An error occurred while sending the notification.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return {
    notificationFormState,
    handleNotificationFormChange,
    handleSubmit,
  };
};
