import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { emailJsSender } from "@/emailjs";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from 'drizzle-orm';

type InitialData = {
  email: string;
  fullName: string;
}

type UserState = "non-active" | "active"

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const TREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 10 * TREE_DAYS_IN_MS;

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
  // Implement user state logic here
  if (!user.length) return "non-active";

  const lastActivityDate = new Date(user[0].lastActivityDate!);
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();

  if (timeDifference > TREE_DAYS_IN_MS && timeDifference < THIRTY_DAYS_IN_MS) return "non-active";
  return 'active';
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload

  await context.run("new-signup", async () => {
    // await sendEmail("Welcome to the platform", email)
    await emailJsSender({
      message: `Welcome to the platform ${fullName}`,
      recipient: email,
      subject: 'Welcome to the platform'
    });
  });

  await context.sleep("wait-for-3-days", TREE_DAYS_IN_MS / 1000)

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        // await sendEmail("Email to non-active users", email)
        await emailJsSender({
          message: `Hey, ${fullName}, we miss you!`,
          recipient: email,
          subject: 'Are you still there'
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        // await sendEmail("Send newsletter to active users", email)
        await emailJsSender({
          message: `Welcome back, ${fullName}!`,
          recipient: email,
          subject: 'Welcome back'
        });
      });
    }

    await context.sleep("wait-for-1-month", THIRTY_DAYS_IN_MS / 1000);
  }
})

async function sendEmail(message: string, email: string) {
  // Implement email sending logic here
  console.log(`Sending ${message} email to ${email}`)
}