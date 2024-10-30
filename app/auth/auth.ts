"use server";

import bcrypt from "bcrypt";
import { FormState, LoginFormSchema, RegisterFormSchema } from "./definitions";
import { getByEmail } from "app/login/actions";
import { createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";
import { CreateUserType, insertUser } from "app/db/queries/users";

// signup
export const signup = async (
  state: FormState,
  formData: FormData
): Promise<FormState> => {
  const formValues = {} as CreateUserType;
  for (const key of formData.keys()) {
    if (key[0] !== "$") {
      // escape safety inputs
      formValues[key] = formData.get(key) as string;
    }
  }

  // validate formData
  const validatedFields = RegisterFormSchema.safeParse(formValues);
  // const validatedFields = RegisterFormSchema.safeParse({
  //   email: formData.get("email") as string,
  //   name: formData.get("name") as string,
  //   password: formData.get("password") as string,
  //   passwordConfirmation: formData.get("passwordConfirmation") as string,
  // });

  console.log(validatedFields);

  // if form is valid, create user in the database
  if (!validatedFields.success) {
    console.log(validatedFields?.error.flatten());
    return {
      errors: validatedFields?.error.flatten().fieldErrors,
      formErrors: validatedFields?.error.flatten().formErrors,
    };
  }

  const password = await hashPassword(formValues.password);
  // const isPasswordCorrect = await bcrypt.compare(password, formValues.password);
  // console.log("isPasswordCorrect:", isPasswordCorrect);
  // console.log(password);
  formValues.password = password;

  try {
    // create a session for the user
    const user = await insertUser(formValues);
    console.log(user);
    // if(!user) throw new Error("Could not insert a user");

    createSession(user[0]?.id || "");
    return {
      success: true,
    };
  } catch (error) {
    console.log("Error inserting a User", error.message);
    return {
      formErrors: [
        "There was an error creating your user. Our team will be informed about this.",
      ],
    };
  }
};

// login
export const login = async (
  state: FormState,
  formData: FormData
): Promise<FormState> => {
  console.log("-- login ...");

  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("username") as string,
    password: formData.get("password") as string,
  });

  if (!validatedFields.success) {
    return {
      // success: false,
      errors: validatedFields.error?.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const userArr = await getByEmail(email);
  // console.log("User:", userArr);

  // if user is not found, return an error
  if (userArr.length === 0) {
    return {
      success: false,
      errors: { email: ["User with this email does not exist"] },
    };
  }

  const user = userArr[0];

  // if user is found, check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  console.log("isPasswordCorrect:", isPasswordCorrect);

  if (!isPasswordCorrect) {
    return {
      // success: false,
      errors: { password: ["Invalid password"] },
    };
  }

  try {
    // if user password is correct, create a session for the user
    await createSession(user.id);
    // redirect("/dashboard");
    return { success: true };
  } catch (error) {
    console.log("Error caught in login - auth:", error.message);
    console.log(error);
    return {
      // success: false,
      formErrors: [
        "There was an error trying to log you in. This error will be reported to our team.",
      ],
    };
  }
};

// logout
export const logout = async () => {
  try {
    deleteSession();
    // redirect to login page
    redirect("/login");
  } catch (err) {
    console.log("Error caught in logout - auth:");
  }
};

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};
