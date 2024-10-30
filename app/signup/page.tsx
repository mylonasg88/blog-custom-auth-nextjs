"use client";

import { signup } from "app/auth/auth";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";

export default function Signup() {
  const router = useRouter();
  const [state, action] = useFormState(signup, undefined);
  console.log(state);

  if (state?.success) {
    router.push("/dashboard");
  }

  return (
    <div className="mb-24">
      <h1 className="text-2xl mb-10">Register</h1>
      <form className="max-w-[356px] flex flex-col gap-6" action={action}>
        <div className="flex-col">
          <div className="row flex flex-row justify-between">
            <label htmlFor="name" className="min-w-24">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="rounded-lg border-cyan-500 p-1 pl-2 text-sm align-bottom flex justify-end"
            />
          </div>
          <span className="text-red-500 pt-2">{state?.errors?.name}</span>
        </div>
        <div className="flex-col">
          <div className="row flex flex-row justify-between">
            <label htmlFor="email" className="min-w-24">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="rounded-lg border-cyan-500 p-1 pl-2 text-sm"
            />
          </div>
          <span className="text-red-500 pt-2">{state?.errors?.email}</span>
        </div>

        <div className="flex-col">
          <div className="row flex flex-row justify-between">
            <label htmlFor="password" className="min-w-24">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="rounded-lg border-cyan-500 p-1 pl-2 text-sm"
            />
          </div>
          <span className="text-red-500 pt-2">{state?.errors?.password}</span>
        </div>
        <div className="flex flex-col">
          <div className="row flex flex-row justify-between">
            <label htmlFor="confirmPassword" className="min-w-24">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="rounded-lg border-cyan-500 p-1 pl-2 text-sm"
            />
          </div>
          <span className="text-red-500 pt-2">
            {state?.errors?.confirmPassword}
          </span>
          <span className="text-red-500 pt-2">
            {state?.formErrors && state?.formErrors[0]}
          </span>
        </div>
        <button className="rounded py-1 border border-cyan-500 w-[100px] hover:text-cyan-500 hover:cursor-pointer hover:border-cyan-300">
          Register
        </button>
      </form>
    </div>
  );
}
