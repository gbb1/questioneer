'use client'
import { fetchTest, getUserData } from "@/query/index";
import { useQuery, useMutation } from "@tanstack/react-query";

import { LobbySetup } from "@/components/LobbySetup";
import { useUser } from "@clerk/nextjs";
import { useEffect, useContext, useState } from "react";
import { SocketContext } from "@/context/socketContext";
import { LobbyCard } from "@/components/LobbyCard";
import { queryClient } from "@/query/index";
import MainPage from "@/components/MainPage";
import { redirect } from "next/navigation";

const GuestHome = () => {
  // const [userData, setUserData] = useState({})
  const [user, setUser] = useState({})
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setUser(JSON.parse(userData))
      console.log('userData', userData)
    } else {
      redirect('/')
    }
  }, [])
  // const { user } = useUser();
  // const { socket } = useContext(SocketContext)
  // const { data, isError, isPending, isLoading, refetch } = useQuery({
  //   queryFn: ({ signal }) => getUserData({ signal, userData: { id: userData?.id }}),
  //   enabled: !!userData?.id,
  //   queryKey: ["user"],
  // });

  // useEffect(() => {
  //   setUserData(JSON.parse(localStorage.getItem('userData') as any))
  // }, [])

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
    <MainPage guest={true} />
  )
}

export default GuestHome;