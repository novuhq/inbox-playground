"use client";
import { useState } from "react";
import { Inbox } from "@novu/react";

export const novuConfig = {
  applicationIdentifier: process.env
    .NEXT_PUBLIC_APPLICATION_IDENTIFIER as string,
  appearance: {
    variables: {},
    elements: {
      bellContainer: {
        color: "",
        width: "30px",
        height: "30px",
      },
      bellIcon: {
        width: "30px",
        height: "30px",
      },
      bellDot: {
        width: "10px",
        height: "10px",
      },
      inbox__popoverContent: {
        width: "59%",
        // height: '80%',
        marginLeft: "-45px",
      },
      popoverContent: {},
      notification: {},
      notificationList: {},
    },
  },
};

function NovuInbox() {
  const [subscriberId, setSubscriberId] = useState<string>(
    localStorage.getItem("inbox_demo_subscriberId") as string
  );
  return <Inbox {...novuConfig} subscriberId={subscriberId} open={true} />;
}

export default NovuInbox;
