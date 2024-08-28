import { useToast } from "@chakra-ui/react";
import { useTheme } from "../contexts/ThemeContext";

export const useNotificationForm = () => {
  const toast = useToast();
  const { notificationForm } = useTheme();
  const { getValues } = notificationForm;

  const onSubmit = async () => {
    const { subscriberFirstName, subscriberLastName, selectedWorkflow } =
      getValues();

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
          payload: getValues(),
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
    notificationForm,
    handleSubmit: onSubmit,
  };
};
