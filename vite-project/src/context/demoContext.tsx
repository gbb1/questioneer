import { createContext, useState, useEffect } from "react";
import { DemoItem } from "../../types/demo";

interface Props {
  children: React.ReactNode;
}

interface DemoContextObj {
  items: DemoItem[];
  addItem: (value: Number, id: Number) => void;
  removeItem: (id: Number) => void;
}

export const DemoContext = createContext<DemoContextObj>({
  items: [],
  addItem: (value: Number, id: Number) => {},
  removeItem: (id: Number) => {},
});

const DemoContextProvider: React.FC<Props> = ({ children }) => {
  const [items, setItems] = useState<DemoItem[]>([]);

  useEffect(() => {
    const savedItems = localStorage.getItem("demo_data");

    if (savedItems) {
      const parsedItems = JSON.parse(savedItems);
      setItems((prev) => parsedItems);
    }
  }, []);

  useEffect(() => {
    if (items.length) {
      localStorage.setItem("demo_data", JSON.stringify(items));
    }
  }, [items]);

  const addItem = (value: Number, id: Number) => {
    const item = { value, id };
    setItems((prev) => [...prev, item]);
  };

  const removeItem = (id: Number) => {
    const index = items.findIndex((td: DemoItem) => td.id === id);
    setItems((prev) => {
      const curr = [...prev];
      curr.splice(index, 1);
      return curr;
    });
  };

  const contextValue: DemoContextObj = {
    items,
    addItem,
    removeItem,
  };

  return (
    <DemoContext.Provider value={contextValue}>{children}</DemoContext.Provider>
  );
};

export default DemoContextProvider;
