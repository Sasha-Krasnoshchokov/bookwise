import { Client as WorkflowClient } from '@upstash/workflow';

import { Client as QStashClient, resend } from "@upstash/qstash";

import config from '@/lib/config';

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken
});


export const qstashClient = new QStashClient({ token: config.env.upstash.qstashToken });

export const sendEmail = async (message: string, email: string) => {

  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: "<RESEND_TOKEN>" }),
    },
    body: {
      from: "Acme <onboarding@resend.dev>",
      to: ["delivered@resend.dev"],
      subject: "Hello World",
      html: "<p>It works!</p>",
    },
  });
};
