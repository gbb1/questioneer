'use client'

import { LobbySetup } from "@/components/LobbySetup";

const Home = () => {
  return (
    <div className="flex flex-col justify-start pt-[50px] items-center w-full h-screen">
      <div className="max-w-[90%] w-[600px] py-10">
        <LobbySetup />
      </div>
    </div>
  )
}

export default Home;