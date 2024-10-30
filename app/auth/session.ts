"use server";

import { SignJWT, jwtVerify } from "jose";
import bcrypt from 'bcrypt';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = process.env.AUTH_KEY_base64;
const key = new TextEncoder().encode(secretKey);

export const encrypt = async (payload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(key);
};

export const decrypt = async (session: string | undefined = "") => {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    console.log("Error decrypting:", error);
    return null;
  }
};

export const createSession = async (userId: string) => {
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });
  // throw new Error("Testing code in case 'Something went wrong'");

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  // redirect("/dashboard");
};

export const verifySession = async () => {
  const cookie = cookies().get("session")?.value;
  const session = (await decrypt(cookie)) as unknown as {
    userId: string;
    expiresAt: string;
  };

  console.log('cookie : ', cookie);
  console.log(session)

  if (!session?.userId) {
    console.log('REDIRECTING TO LOGIN');
    // redirect("/login");
    return { isAuth: false, userId: null };
  }

  return { isAuth: true, userId: session.userId };
};

export async function updateSession() {
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export const deleteSession = async () => {
  try {
    // throw new Error("Not implemented");
    cookies().delete("session");
  } catch (err) {
    console.log("Error deleting a session:", err.message);
  }
};

// export const hashPassword = async (password: string) => {
//   return bcrypt.hash(password, 12);
// }
