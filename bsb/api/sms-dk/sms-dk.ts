// eslint-disable-next-line @typescript-eslint/no-var-requires
const superagent = require("superagent");

/*
    {
      "status": "success",
      "messageCode": 5000,
      "result": {
        "totalCreditSum": 1,
        "messageSize": 1,
        "batchId": "bb3ddc53-8969-6d90-de09-134d570c28c1",
        "report": {
          "accepted": [
            {
              "receiver": "4531317428",
              "country": "Denmark",
              "countryCode": "DK",
              "creditCost": 1
            }
          ],
          "rejected": []
        }
      }
    }
  */

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace SMSDK {
  export interface Accepted {
    receiver: string;
    country: string;
    countryCode: string;
    creditCost: number;
  }

  export interface Report {
    accepted: Accepted[];
    rejected: unknown[];
  }

  export interface Result {
    totalCreditSum?: number;
    messageSize?: number;
    batchId: string;
    report?: Report;
  }

  export interface Response {
    status: string;
    messageCode?: number;
    result: Result;
  }
}

interface SendProps {
  receiver: string | number;
  message: string;
  scheduled?: Date;
}

export const SmsDkApiSend = async ({ receiver, message, scheduled }: SendProps) => {
  if (process.env.NODE_ENV === "production") {
    const response: { body: SMSDK.Response } = await superagent
      .post("https://api.sms.dk/v1/sms/send")
      .send({
        message,
        receiver,
        scheduled: scheduled ? scheduled.toISOString().slice(0, -1) : null,
        senderName: "BySisters",
      })
      .set("Authorization", `Bearer ${process.env.SMSDK_SECRET}`)
      .set("content-type", "application/json");
    return response.body;
  }

  // eslint-disable-next-line no-console
  console.log({
    message,
    receiver,
    scheduled: scheduled ? scheduled.toISOString().slice(0, -1) : null,
    senderName: "BySisters",
  });

  return {
    result: {
      batchId: "bb3ddc53-8969-6d90-de09-134d570c28c1",
    },
    status: "success",
  };
};

export const SmsDkApiCancel = async (batchId: string) => {
  if (process.env.NODE_ENV === "production") {
    const response = await superagent
      .delete(`https://api.sms.dk/v1/sms/delete?batchId=${batchId}`)
      .set("Authorization", `Bearer ${process.env.SMSDK_SECRET}`)
      .set("content-type", "application/json");
    return response.body;
  }

  return {
    result: {
      batchId: "bb3ddc53-8969-6d90-de09-134d570c28c1",
    },
    status: "success",
  };
};
