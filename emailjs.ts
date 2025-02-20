
import emailjs from '@emailjs/browser';

import config from '@/lib/config';

const emailjsOptions = {
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
};

emailjs.init(emailjsOptions);

const {serviceId, templateId } = config.env.emailjs;

interface SendEmailProps {
  message: string;
  recipient: string;
  subject?: string;
}
export const emailJsSender = async ({ message, recipient, subject = ''}: SendEmailProps) => {
  console.log('sending email');
  const response = await emailjs.send(serviceId, templateId, { message, recipient, subject });

  console.log({response})
};
