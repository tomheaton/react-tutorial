import { useItemData } from "@/itemReducer";
import { useMemo, useState, type FormEvent } from "react";

const Items: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [nextItemId, setNextItemId] = useState<number>(1);

  const { data: itemData, dispatch } = useItemData();

  const filteredItems = useMemo(
    () =>
      itemData.items.filter((item) =>
        item.value.toLowerCase().includes(search.toLowerCase())
      ),
    [search, itemData]
  );

  const handleAddItem = (e: FormEvent) => {
    e.preventDefault();
    console.log("adding item...");
    dispatch({
      type: "ADD_ITEM",
      payload: { id: nextItemId, value: input, checked: false },
    });
    setInput("");
    setNextItemId((i) => i + 1);
  };

  const handleRemoveItem = (id: number) => {
    console.log("removing item...");
    dispatch({
      type: "DELETE_ITEM",
      payload: id,
    });
  };

  const handleDoneItem = (id: number) => {
    console.log("done item...");
    dispatch({
      type: "TOGGLE_ITEM",
      payload: id,
    });
  };

  return (
    <div className="w-full h-screen flex pt-20 justify-evenly">
      <pre>
        <code>{JSON.stringify(itemData, null, 2)}</code>
      </pre>
      <div className="w-1/4 flex flex-col">
        <p className="font-bold">add item</p>
        <br />
        <form onSubmit={handleAddItem} className="flex flex-col w-full">
          <input
            className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="apples, oranges, etc."
            required
          />
          <br />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            add item
          </button>
        </form>
      </div>
      <div className="w-1/4 flex flex-col">
        <p className="font-bold">items</p>
        <br />
        <input
          type="text"
          className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          placeholder="apples, oranges, etc."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <br />
        {!filteredItems.length && <p>no items</p>}
        {/* <ul className="list-disc space-y-2 overflow-y-scroll"> */}
        <ul className="list-disc space-y-2">
          {filteredItems.map((item, index) => (
            <li
              key={index}
              className="space-x-2 flex items-center justify-between border-2 border-gray-300 rounded-lg p-2"
            >
              <p className={`break-all ${item.checked && "line-through"}`}>
                {item.value}
              </p>
              <div className="space-x-2">
                <button
                  className={`${
                    item.checked
                      ? "bg-green-500 hover:bg-green-700"
                      : "bg-orange-500 hover:bg-orange-700"
                  } text-white font-bold py-2 px-4 rounded-lg`}
                  onClick={() => handleDoneItem(item.id)}
                >
                  {item.checked ? "done" : "not done"}
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Items;
