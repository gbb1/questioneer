'use client'
import { fetchTest, getUserData } from "@/query/index";
import { useQuery, useMutation } from "@tanstack/react-query";

import { LobbySetup } from "@/components/LobbySetup";
import { useUser } from "@clerk/nextjs";
import { useEffect, useContext } from "react";
import { SocketContext } from "@/context/socketContext";
import { LobbyCard } from "@/components/LobbyCard";
import { queryClient } from "@/query/index";
import MainPage from "@/components/MainPage";

const UserHome = () => {
  // const { user } = useUser();
  // const { socket } = useContext(SocketContext)
  // const { data, isError, isPending, isLoading, refetch } = useQuery({
  //   queryFn: ({ signal }) => getUserData({ signal, userData: { id: user?.id }}),
  //   enabled: !!user,
  //   queryKey: ["user"],
  // });


  // useEffect(() => {
  //   socket?.on('lobby-left', (res) => {
  //     queryClient.invalidateQueries({ queryKey: ["user"] });
  //   })
  // }, [socket])
  // // const {} = useQuery({
  // //   queryFn: ({ signal }) => {
  // //     return new Promise((resolve) => {
  // //       socket?.on('joined')
  // //     })
  // //   }
  // // })

  // useEffect(() => {
  //   console.log('uSER DATA', data, user?.id)
  //   const userData = localStorage.getItem('userData')
  //   console.log('username', userData)
  // }, [data, user])

  return (
    <MainPage guest={false} />
  )
}

export default UserHome;