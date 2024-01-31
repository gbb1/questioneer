"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";
import { Button } from "@/components/ui/button";
// import "./navbar.css";

const Navbar = () => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { user, setUser, setRefresh } = useContext(UserContext);
  let href = userId ? "/home" : "/new-user";
  href = user ? "/guest/home" : "/new-user";
  // ${height > 1 ? "fade-in-shadow" : "fade-out-shadow"}
  const leaveGuest = () => {
    localStorage.removeItem('userData')
    setRefresh(prev => !prev)
  }

  return (
    <div
      className={`
      w-screen bg-zinc-50 md:w-full max-h-[50px] md:h-[50px] md:max-h-[50px]
      flex items-center justify-between fixed top-0 px-4 md:px-6 py-3 z-[10]
    `}
    >
      <div className="flex flex-row gap-2">
        {/* <Image
          src={LogoNew}
          alt="logo?"
          width={35}
          height={35}
          className="hover:opacity-60 cursor-pointer transition-opacity duration-200"
        /> */}
        [ qstneer ]
      </div>
      <div>
        {userId || user ? null : (
          <Link href={href}>
            <Button type="button" className="text-xs">
              Log in
            </Button>
          </Link>
        )}
        {
          userId ?? <UserButton afterSignOutUrl="/" />
        }
        {
          user ? <Button type="button" onClick={leaveGuest}>Sign out guest</Button> : null
        }
      </div>
    </div>
  );
};

export default Navbar;
