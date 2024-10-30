"use client";

import { login } from "app/auth/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";

export default function LoginForm() {
  const router = useRouter();
  const [state, action] = useFormState(login, undefined);
  console.log(state);

  if (state?.success) {
    router.push("/dashboard");
  } 

  return (
    <form className="flex flex-col gap-6 max-w-72" action={action}>
      <div className="flex flex-row gap-2 align-center">
        <label htmlFor="username" className="min-w-24">
          Username
        </label>
        <div className="flex flex-col">
          <input
            type="email"
            name="username"
            id="username"
            className="rounded-lg border-cyan-500 p-1 pl-2 text-sm"
          />
          {state?.errors?.email && (
            <span className="text-red-500 pt-2">{state?.errors?.email}</span>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <label htmlFor="password" className="min-w-24">
          Password
        </label>
        <div className="flex flex-col">
          <input
            type="password"
            name="password"
            id="password"
            className="rounded-lg border-cyan-500 p-1 pl-2 text-sm"
          />
          {state?.errors?.password && (
            <span className="text-red-500 pt-2">{state?.errors?.password}</span>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-6 items-center">
        <button className="rounded py-1 border border-cyan-500 w-[100px] hover:text-cyan-500 hover:cursor-pointer hover:border-cyan-300">
          Login
        </button>
        <Link href="/signup" className="text-cyan-500 hover:text-white">
          Register
        </Link>
      </div>
    </form>
  );
}
