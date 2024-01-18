"use client";
import { createContext, useState, useEffect } from "react";
import { DemoItem } from "../types/demo";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

interface UserContextObj {
  user: any | null;
  setUser: (user: any) => void;
}

export const UserContext = createContext<UserContextObj>({
  user: null,
  setUser: (user: any) => {},
});

const UserContextProvider: React.FC<Props> = ({ children }) => {
  const { user: clerkUser } = useUser();
  const [user, setUser] = useState<any | null>(null);
  console.log('here')
  useEffect(() => {
    console.log('running')
    if (clerkUser) {
      setUser(clerkUser);
      // return;
    }
  }, [clerkUser]);

  useEffect(() => {
    console.log('rendering')
    const guest = JSON.parse(localStorage.getItem("userData") as any)
    console.log('guest', guest)
    if (guest) {
      setUser(guest);
    } else {
      redirect("/");
    }
  }, [])

  const contextValue: UserContextObj = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
