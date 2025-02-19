'use server';

import { signIn } from "@/authjs";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import ratelimit from "@/lib/ratelimit";
import { redirect } from "next/navigation";
// import { workflowClient } from "@/lib/workflow";
// import config from "@/lib/config";

const checkRateLimits = async () => {
  const userIp = (await headers()).get('x-forwarded-for') || '127.0.0.1';

  const { success } = await ratelimit.limit(userIp);

  if (!success) return redirect('/too-fast');
}

export const signInWithCredentials = async (params: Pick<AuthCredentials, 'email' | 'password'>) => {
  const { email, password } = params;

  await checkRateLimits();

  try {
    const result = await signIn('credentials', {
      email, password, redirect: false,
    })

    if (result?.error) {
      return {
        success: false,
        error: result.error,
      };
    }
    return {
      success: true,
    }
  } catch (error: any) {
    console.error(error, 'Signup error');

    return {
      success: false,
      error: 'Signup error',
    };
  }
}

export const signUp = async (params: AuthCredentials) => {
  const { email, password, fullName, universityId, universityCard } = params;

  await checkRateLimits();

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return {
      success: false,
      error: "User already exists",
    };
  }

  const hashedPassword = await hash(password, 10);

  try {
    // console.log('should send email')
    // const url = `${config.env.apiEndpoint}/api/workflow/onboarding/`
    // console.log(url)
        // await workflowClient.trigger({
        //   url: `${config.env.prodApiEndpoint}/api/workflow/onboarding`,
        //   // url: `${config.env.apiEndpoint}/api/workflow/onboarding`,
        //   body: {
        //     email,
        //     fullName,
        //   },
        // });
    //     console.log({result});
    await db.insert(users).values({
      fullName,
      email,
      universityId,
      universityCard,
      password: hashedPassword,
    });

    await signInWithCredentials({ email, password });

    return {
      success: true,
    };
  } catch (error: any) {
    console.error(error, 'Signup error');

    return {
      success: false,
      error: 'Signup error',
    };
  }

};
