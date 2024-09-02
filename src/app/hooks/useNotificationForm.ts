import { useToast } from "@chakra-ui/react";
import { useTheme } from "../contexts/ThemeContext";
import { useState } from "react";

export const useNotificationForm = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { notificationForm } = useTheme();
  const { getValues } = notificationForm;

  const onSubmit = async () => {
    const { subscriberFirstName, subscriberLastName, selectedWorkflow } =
      getValues();

    if (!subscriberFirstName) {
      toast({
        title: "Missing Information",
        description: "Please fill in your first name.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/trigger", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workflowId: selectedWorkflow,
          to: {
            subscriberId: localStorage.getItem("inbox_demo_subscriberId"),
            firstName: subscriberFirstName,
            lastName: subscriberLastName,
          },
          payload: {},
          bridgeUrl: "https://inbox-playground.vercel.app/api/novu",
          controls: {
            "in-app-step": getValues(),
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
    } finally {
      setIsLoading(false);
    }
  };

  return {
    notificationForm,
    handleSubmit: onSubmit,
    isLoading,
  };
};
