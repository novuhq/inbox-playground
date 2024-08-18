'use client';
import { Inbox } from "@novu/react";

export const novuConfig = {
    applicationIdentifier: process.env.APPLICATION_IDENTIFIER,
    subscriberId: process.env.SUBSCRIBER_ID,
    // open: { open },
    appearance: {
        variables: {
        },
        elements: {
            bellContainer: {
                color: '',
                width: '30px',
                height: '30px',
            },
            bellIcon: {
                width: '30px',
                height: '30px',
},
            bellDot: {
                width: '10px',
                height: '10px',
            },
            inbox__popoverContent: {
                width: '59%',
                // height: '80%',
                marginLeft: '-45px'
            },
            popoverContent: {},
            notification: {},
            notificationList: {},
        },
    }
};

function NovuInbox() {
    return (
                <Inbox {...novuConfig} />
    );
}

export default NovuInbox;
