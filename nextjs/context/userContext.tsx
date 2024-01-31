"use client";
import { createContext, useState, useEffect } from "react";
import { DemoItem } from "../types/demo";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { usePathname } from 'next/navigation'

interface Props {
  children: React.ReactNode;
}

interface UserContextObj {
  user: any | null;
  setUser: (user: any) => void;
  setRefresh: (status:boolean) => void,
}

export const UserContext = createContext<UserContextObj>({
  user: null,
  setUser: (user: any) => {},
  setRefresh: (status:boolean) => {},
});

const UserContextProvider: React.FC<Props> = ({ children }) => {
  const { user: clerkUser } = useUser();
  const pathname = usePathname()
  const [user, setUser] = useState<any | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false)

  useEffect(() => {
    if (clerkUser) {
      setUser(clerkUser);
    }
  }, [clerkUser]);

  useEffect(() => {

    let guest = JSON.parse(localStorage.getItem("userData") as any)
    // console.log("GUEST", guest);
    if (guest) {
      if (guest.expiration <= new Date().getTime()) {
        localStorage.removeItem("userData");
        guest = null
        return
      } else {
        guest.expiration = new Date().getTime() + (24 * 60 * 60 * 1000);
        localStorage.setItem("userData", JSON.stringify(guest))
      }
      setUser(guest);
      if (pathname === '/') {
        redirect("/guest/home");
      }
    } else {
      if (pathname !== '/') {
        redirect("/");
      }
    }
  }, [pathname, refresh])

  const contextValue: UserContextObj = {
    user,
    setUser,
    setRefresh,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
