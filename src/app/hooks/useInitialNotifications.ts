import { useEffect } from "react";
import { useNotificationForm } from "./useNotificationForm";
import { useSubscriber } from "./useSubscriber";
import { useTheme } from "../contexts/ThemeContext";

export const useInitialNotifications = () => {
  const { subscriberId, isNewSubscriber } = useSubscriber();
  const { selectedTheme } = useTheme();
  const { notificationForm } = useNotificationForm();

  useEffect(() => {
    if (isNewSubscriber && subscriberId) {
      const triggerInitialNotifications = async () => {
        for (const workflow of selectedTheme.workflows) {
          const workflowData = workflow.data || {};

          await fetch("/api/trigger", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              workflowId: workflow.id,
              to: {
                subscriberId: `${subscriberId}_${selectedTheme.id}`,
                firstName: "New",
                lastName: "User",
              },
              payload: {},
              bridgeUrl: "https://inbox-playground.vercel.app/api/novu",
              controls: {
                "in-app-step": {
                  ...notificationForm.getValues(),
                  ...workflowData,
                  inAppSubject: workflowData.inAppSubject,
                  inAppBody: workflowData.inAppBody,
                  inAppAvatar: workflowData.inAppAvatar,
                  showInAppAvatar: workflowData.showInAppAvatar,
                  inAppPrimaryActionLabel: workflowData.inAppPrimaryActionLabel,
                  enablePrimaryAction: workflowData.enablePrimaryAction,
                  inAppPrimaryActionUrl: workflowData.inAppPrimaryActionUrl,
                  inAppSecondaryActionLabel:
                    workflowData.inAppSecondaryActionLabel,
                  enableSecondaryAction: workflowData.enableSecondaryAction,
                  inAppSecondaryActionUrl: workflowData.inAppSecondaryActionUrl,
                },
              },
            }),
          });
        }

        localStorage.setItem("workflows_triggered", "true");
      };

      triggerInitialNotifications();
    }
  }, [isNewSubscriber, subscriberId, selectedTheme, notificationForm]);
};
