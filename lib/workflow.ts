import { Client as WorkflowClient } from '@upstash/workflow';

import { Client as QStashClient, resend } from "@upstash/qstash";
import emailjs from '@emailjs/browser';
import config from '@/lib/config';

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken
});


export const qstashClient = new QStashClient({ token: config.env.upstash.qstashToken });

export const sendEmail = async (message: string, email: string) => {
  emailjs.init({
    publicKey: config.env.emailjs.publicKey,
    // Do not allow headless browsers
    blockHeadless: true,
    blockList: {
      // Block the suspended emails
      list: ['foo@emailjs.com', 'bar@emailjs.com'],
      // The variable contains the email address
      watchVariable: 'userEmail',
    },
    limitRate: {
      // Set the limit rate for the application
      id: 'app',
      // Allow 1 request per 10s
      throttle: 10000,
    },
  });
  await emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    { message, recipient: email, subject: 'Welcome to the platform' },
  );
  // await qstashClient.publishJSON({
  //   api: {
  //     name: "email",
  //     provider: resend({ token: "<RESEND_TOKEN>" }),
  //   },
  //   body: {
  //     from: "Acme <onboarding@resend.dev>",
  //     to: ["delivered@resend.dev"],
  //     subject: "Hello World",
  //     html: "<p>It works!</p>",
  //   },
  // });
};
