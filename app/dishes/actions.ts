"use server";

import { findAll, findByTag, findDishByName, insertDish } from "app/db/schemas/dishes";
import { redirect } from "next/navigation";

export const createDish = async (formData: FormData) => {
  // Because this action doesn't interact with the form, returning errors or success status
  // it can redirect to any page. This should be refactored and display errors on the form.
  try {
    await insertDish({
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: (formData.get("price") as unknown as number) || (0 as number),
      image: formData.get("image") as string,
      tag: formData.get("tag") as string,
      isDisabled:
        (formData.get("isDisabled") as unknown as boolean) ||
        (false as boolean),
    });
  } catch (err) {
    console.log("Error:", err);
  } finally {
    redirect("/dishes");
  }
};

export const getAllDishes = async () => {
  return findAll();
};

export const getByName = async () => {
  return await findDishByName("name")
};

export const getByTag = async () => {
  return await findByTag("greek");
}
