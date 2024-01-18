"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createLobby, joinLobby, queryClient, apiMutate } from "@/query";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { MouseEvent } from "react";
import { useContext, useEffect } from "react";
import { SocketContext } from "@/context/socketContext";
import { UserContext } from "@/context/userContext";

const formSchema = z.object({
  lobbyCode: z.string().min(4, {
    message: "Code must be 4 characters",
  }).max(6, {
    message: "Code must be 4 characters",
  }),
});

export function LobbySetup() {
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserContext)
  console.log('USER', user)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lobbyCode: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (userData: any) => {
      return apiMutate(userData as any, 'createLobby');
    },
    onSuccess: (res) => {
      form.setValue("lobbyCode", res.lobby?.lobby_id as string)
    }
  });

  const { mutate:tryJoinLobby } = useMutation({
    mutationFn: async (data:any) => {
      const { id, lobby_id }:any = data
      return joinLobby(id, lobby_id, socket);
    },
    onSuccess: (res) => {
      form.setValue("lobbyCode", "")
      queryClient.invalidateQueries({ queryKey: ["user"] });
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log('clicked')
    // ✅ This will be type-safe and validated.
    const code = form.getValues("lobbyCode")
    const obj = { id: user?.id, lobby_id: code }
    // tryJoinLobby(obj)
    // console.log('HELLO', obj)
    socket?.emit('join-lobby', obj)
  }

  const onClick = (event:MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault()
    if (user) {
      // console.log("USER??", user)
      const result:any = mutate({ id: user?.id })
      // form.setValue("lobbyCode", result?.lobby?.lobby_id as string)
    } else {
      // const result:any = mutate({ id: userData?.id })
      console.log('ERROORRR')
    }
  }

  useEffect(() => {
    socket?.on("join-success", (res) => {
      console.log("joined")
      form.setValue("lobbyCode", "")
      queryClient.invalidateQueries({ queryKey: ["user"] });
    })
  }, [socket, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="lobbyCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Play a new game</FormLabel>
              <FormControl>
                <Input placeholder="Lobby code" {...field} />
              </FormControl>
              <FormDescription>
                This is a 4 letter code.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-2 justify-end">
          <Button type="button" disabled={form.getValues("lobbyCode")?.length > 0} onClick={onClick}>Create game</Button>
          <Button type="submit" disabled={form.getValues("lobbyCode")?.length === 0}>Join</Button>
        </div>
      </form>
    </Form>
  );
}
