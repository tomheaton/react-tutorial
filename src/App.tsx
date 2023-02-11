import Items from "@/Items";
import { ItemContext, initialItemState, itemReducer } from "@/itemReducer";
import { useReducer } from "react";

const App: React.FC = () => {
  const [itemData, dispatch] = useReducer(itemReducer, initialItemState);

  return (
    <ItemContext.Provider value={{ data: itemData, dispatch }}>
      <Items />
    </ItemContext.Provider>
  );
};

export default App;
