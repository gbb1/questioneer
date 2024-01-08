"use client";
import axios from "axios";
import QueryTester from "@/components/QueryTester";
import { useUser } from "@clerk/nextjs";
import { setUsername } from "@/query";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";

export default function Home() {
  const { user } = useUser();
  // const mutationConfig = useMemo(() => {
  //   return {
  //     mutationFn: (userData: any) => {
  //       return setUsername(userData as any);
  //     },
  //   };
  // }, []);

  const { mutate } = useMutation({
    mutationFn: (userData: any) => {
      return setUsername(userData as any);
    },
  });

  useEffect(() => {
    let id;
    if (!user) {
      id = localStorage.getItem("id");
      if (!id) return
    }

    const username = localStorage.getItem("username");
    const userData = {
      unique_id: user?.id || id,
      username,
    };

    mutate(userData as any);
  }, [user, mutate]);

  return (
    <div className="w-screen h-screen flex justify-center items-center ">
      <QueryTester />
    </div>
  );
}
