'use client'
import { fetchTest, getUserData } from "@/query/index";
import { useQuery, useMutation } from "@tanstack/react-query";

import { LobbySetup } from "@/components/LobbySetup";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const Home = () => {
  const { user } = useUser();
  const { data, isError, isPending, isLoading, refetch } = useQuery({
    queryFn: ({ signal }) => getUserData({ signal, userData: { id: user?.id }}),
    enabled: !!user,
    queryKey: ["user"],
  });

  useEffect(() => {
    console.log('uSER DATA', data, user?.id)
  }, [data, user])

  return (
    <div className="flex flex-col justify-start pt-[50px] items-center w-full h-screen">
      <div className="max-w-[90%] w-[600px] py-10">
        <LobbySetup />
      </div>
    </div>
  )
}

export default Home;