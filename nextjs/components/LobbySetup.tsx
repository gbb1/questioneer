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

import { createLobby } from "@/query";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import { MouseEvent } from "react";

const formSchema = z.object({
  username: z.string().min(6, {
    message: "Code must be 6 characters",
  }).max(6, {
    message: "Code must be 6 characters",
  }),
});

export function LobbySetup() {
  const { user } = useUser();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: (userData: any) => {
      return createLobby(userData as any);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const onClick = (event:MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault()
    if (user) {
      const test = mutate({ id: user.id })
      console.log(test)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Play a new game</FormLabel>
              <FormControl>
                <Input placeholder="Lobby code" {...field} />
              </FormControl>
              <FormDescription>
                This is a 6 letter code.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row gap-2 justify-end">
          <Button type="button" onClick={onClick}>Create game</Button>
          <Button type="submit">Join</Button>
        </div>
      </form>
    </Form>
  );
}
