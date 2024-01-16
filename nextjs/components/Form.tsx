"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

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
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { createUser } from "@/query";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function ProfileForm() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const router = useRouter();
  if (userId) redirect("/home");

  let href = userId ? "/home" : "/new-user";
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (userData: any) => {
      return createUser(userData as any);
    },
    onSuccess: (res) => {
      console.log('RESPONSE', res);
      localStorage.setItem("userData", JSON.stringify(res));
      form.setValue("username", "");
      router.push("/guest/home");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  async function onClick() {
    mutate({ userData: { guest: true, username: form.getValues("username") } });
  }

  // useEffect(() => {
  //   const username = form.getValues("username");
  //   if (username.length > 0) {
  //     localStorage.setItem("username", form.getValues("username"));
  //   }
  // }, [form]);

  useEffect(() => {
    return () => {
      form.setValue("username", "");
    };
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username..." {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div></div>
        <div>
          {/* <Link href={{ pathname: "/guest/home" }}> */}
          <Button
            onClick={onClick}
            disabled={form.getValues("username").length === 0}
            type="button"
          >
            Play as guest
          </Button>
          {/* </Link> */}
          <Link href={{ pathname: href }}>
            <Button
              disabled={form.getValues("username").length === 0}
              type="submit"
            >
              Sign up
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}
