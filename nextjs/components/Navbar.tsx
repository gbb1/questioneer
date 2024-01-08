"use client";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";

// import "./navbar.css";

const Navbar = () => {

  const { isLoaded, userId, sessionId, getToken } = useAuth();
  let href = userId ? "/home" : "/new-user";

  // ${height > 1 ? "fade-in-shadow" : "fade-out-shadow"}
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
        {!userId && (
          <Link href={href}>
            <button
              className="text-xs bg-black text-white px-4 py-3
        rounded-sm flex-row flex gap-2 items-center
        hover:bg-green-400 transition-all justify-between"
            >
              Get started
            </button>
          </Link>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
