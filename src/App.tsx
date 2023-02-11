import { type FormEvent, useState } from "react";

const App: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const handleAddItem = (e: FormEvent) => {
    e.preventDefault();
    console.log("adding item...");
    setItems([...items, input]);
    setInput("");
  };

  const handleRemoveItem = (index: number) => {
    console.log("removing item...");
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full h-screen flex pt-20 justify-evenly">
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
        <ul className="list-disc space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="space-x-2 flex items-center justify-between border-2 border-gray-300 rounded-lg p-2"
            >
              <p className="break-all">{item}</p>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => handleRemoveItem(index)}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
