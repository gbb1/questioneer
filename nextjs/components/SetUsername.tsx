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
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "@/context/socketContext";
import { UserContext } from "@/context/userContext";

const formSchema = z.object({
  username: z.string(),
  // .min(4, {
  //   message: "Username must be greater than ",
  // }).max(6, {
  //   message: "Code must be 4 characters",
  // }),
});

export function SetUsername({ userData }: any) {
  const { user, setUser } = useContext(UserContext);
  const [focus, setFocus] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username,
    },
  });

  // form.setValue("username", userData?.username);

  const { mutate } = useMutation({
    mutationFn: async (userData: any) => {
      return apiMutate(userData as any, "setUsername");
    },
    onSuccess: (res) => {
      // form.setValue("lobbyCode", res.lobby?.lobby_id as string)
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setFocus(false);
    },
  });

  const handleFocus = () => {
    setFocus(true);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    const obj = { id: user?.id, username: form.getValues("username") };
    mutate(obj);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-row w-full justify-between"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Update username</FormLabel>
              <FormControl>
                <Input
                  onFocus={() => setFocus(true)}
                  placeholder={user.username}
                  className="w-full"
                  {...field}
                />
              </FormControl>
              {/* <FormDescription>This is a 4 letter code.</FormDescription> */}
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-2 justify-end">
          <Button
            type="submit"
            disabled={
              form.getValues("username") === userData?.username ||
              form.getValues("username")?.length === 0
            }
          >
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
}
