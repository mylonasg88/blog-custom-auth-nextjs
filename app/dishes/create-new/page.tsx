import { createDish } from "../actions";

export default function CreateNew() {
  return (
    <div>
      <h1 className="text-2xl">Dishes</h1>
      <form action={createDish} className="flex flex-col gap-3 max-w-64">
        <input className="p-2" type="text" name="name" placeholder="Name" />
        <input
          className="p-2"
          type="text"
          name="description"
          placeholder="Description"
        />
        <input className="p-2" type="number" name="price" placeholder="Price" />
        {/* <input type="text" name="image" placeholder="Image URL" /> */}
        <input className="p-2" type="text" name="tag" placeholder="Tag" />
        <div className="input-group gap-2 flex items-center">
          <label htmlFor="isDisabled">Disabled</label>
          <input
            className="h-4 w-4"
            type="checkbox"
            name="isDisabled"
            id="isDisabled"
          />
        </div>
        <button type="submit" className="rounded-2xl h-6 bg-cyan-600 hover:cursor-pointer">Create</button>
      </form>
    </div>
  );
}
