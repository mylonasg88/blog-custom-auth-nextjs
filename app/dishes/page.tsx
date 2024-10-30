"use server";

import Link from "next/link";
import { getAllDishes, getByName, getByTag } from "./actions";
import Image from "next/image";

export default async function DishesPage() {
  return (
    <div>
      <h1 className="text-2xl mb-8">Dishes</h1>
      <Link href="/dishes/create-new">Create New</Link>
      <DishesTable />
    </div>
  );
}

const DishesTable = async () => {
  const dishes = await getAllDishes();
  const dish = await getByName();
  const byTag = await getByTag();
  console.log('dish:', dish[0]);
  console.log('byTag:', byTag);
  // console.log("dishes:", dishes);

  return (
    <div className="container- mx-auto- mt-8 w-full">
      <table className="min-w-full bg-white- border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Tag</th>
            <th className="py-2 px-4 border-b">Is Disabled</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">Updated At</th>
            <th className="py-2 px-4 border-b">Disabled At</th>
            <th className="py-2 px-4 border-b">Deleted At</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => (
            <tr key={dish.id}>
              <td className="py-2 px-4 border-b truncate-8ch">{dish.id}</td>
              <td className="py-2 px-4 border-b">{dish.name}</td>
              <td className="py-2 px-4 border-b">{dish.description}</td>
              <td className="py-2 px-4 border-b">${dish.price}</td>
              <td className="py-2 px-4 border-b">
                <Image
                  src={dish.image || ""}
                  alt="Dish Image"
                  className="w-16 h-16 object-cover"
                  width={64}
                  height={64}
                />
              </td>
              <td className="py-2 px-4 border-b">{dish.tag}</td>
              <td className="py-2 px-4 border-b">{dish.isDisabled}</td>
              <td className="py-2 px-4 border-b">
                {dish.createdAt.toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">{dish.updatedAt?.toDateString()}</td>
              <td className="py-2 px-4 border-b">{dish.disabledAt?.toDateString()}</td>
              <td className="py-2 px-4 border-b">{dish.deletedAt?.toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
