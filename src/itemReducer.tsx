import { createContext, useContext } from "react";

export type Item = {
  id: number;
  value: string;
  checked: boolean;
};

type ItemState = {
  items: Item[];
};

export const initialItemState: ItemState = {
  items: [],
};

type ItemAction =
  | { type: "ADD_ITEM"; payload: Item }
  | { type: "DELETE_ITEM"; payload: number }
  | { type: "TOGGLE_ITEM"; payload: number }
  | { type: "EDIT_ITEM"; payload: Pick<Item, "id" | "value"> };

export const itemReducer = (state: ItemState, action: ItemAction) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "TOGGLE_ITEM":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload) {
            return {
              ...item,
              checked: !item.checked,
            };
          }
          return item;
        }),
      };
    case "EDIT_ITEM":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              value: action.payload.value,
            };
          }
          return item;
        }),
      };
  }
};

type ItemContextType = {
  data: ItemState;
  dispatch: React.Dispatch<ItemAction>;
};

export const ItemContext = createContext<ItemContextType | null>(null);

export const useItemData = () => {
  const context = useContext(ItemContext);

  if (context === null) {
    throw new Error("useItemData must be used within a ItemProvider");
  }

  return {
    ...context,
  };
};
