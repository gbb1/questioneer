'use client'
import { fetchTest, getUserData } from "@/query/index";
import { useQuery, useMutation } from "@tanstack/react-query";

import { LobbySetup } from "@/components/LobbySetup";
import { useUser } from "@clerk/nextjs";
import { useEffect, useContext, useState } from "react";
import { SocketContext } from "@/context/socketContext";
import { LobbyCard } from "@/components/LobbyCard";
import { queryClient } from "@/query/index";

const MainPage = ({ guest }) => {
  const [userData, setUserData] = useState({})
  const { user } = useUser();

  const { socket } = useContext(SocketContext);
  const { data, isError, isPending, isLoading, refetch } = useQuery({
    queryFn: ({ signal }) => getUserData({ signal, userData: { id: !guest ? user?.id : userData?.id }}),
    enabled: !guest ? !!user : !!userData?.id,
    queryKey: ["user"],
  });

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('userData') as any))
  }, [])

  useEffect(() => {
    socket?.on('lobby-left', (res) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    })
  }, [socket])

  useEffect(() => {
    if (!user) {
      const userData = localStorage.getItem('userData')
    }
  }, [data, user])

  return (
    <div className="flex flex-col justify-start pt-[50px] items-center w-full h-screen">
      <div className="max-w-full px-4 w-[600px] py-10">
        <LobbySetup guest={true} userData={userData}/>
      </div>
      <div className="max-w-full w-[600px] pb-10 flex flex-col gap-4 items-center justify-start px-4">
        <h1 className="w-full scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Your lobbies:
        </h1>
        {
          data?.data?.lobbies && data?.data?.lobbies.map((lobby:any) => <div key={lobby.lobby_id} className="w-full"><LobbyCard lobbyData={lobby} user={user?.id} /></div>)
        }
      </div>
    </div>
  )
}

export default MainPage