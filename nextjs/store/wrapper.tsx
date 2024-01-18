'use client'
import { Provider } from "react-redux";
import store from "./index";
import { useUser } from "@clerk/nextjs";

interface Props {
  children: React.ReactNode;
}

const StoreWrapper: React.FC<Props> = ({ children }) => {

  return (
    <Provider store={store}>{children}</Provider>
  );
};

export default StoreWrapper;
