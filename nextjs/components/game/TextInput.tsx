"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Slider } from "@/components/ui/slider";
// import * as Slider from '@radix-ui/react-slider';

const FormSchema = z.object({
  bio: z
    .string()
    .min(10, {
      message: `Input must be at least 10 characters.`,
    })
    .max(200, {
      message: "Input must not be longer than 240 characters.",
    }),
});

const TextInput = ({ type, actionData }) => {
  const [wager, setWager] = useState(0);

  const showSlider = type === "answer";
  const prompt =
    type === "question"
      ? "What question would you like to ask?"
      : actionData.question;
  const maxWager = actionData?.playerData?.points || null;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: `Your ${type} is in!`,
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 py-6"
      >
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">{prompt}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Come up with something..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              {showSlider && (
                <div className="flex flex-col gap-4 pt-8">
                  <div className="flex flex-row w-full justify-between gap-2">
                    <div className="text-lg w-[10%] justify-start flex">0</div>
                    <div className="text-lg w-[10%] justify-end flex">{wager}</div>
                  </div>
                    <Slider
                      defaultValue={[0]}
                      max={maxWager}
                      step={50}
                      onValueChange={(val) => setWager(val[0])}
                      className=""
                    />
                  <FormDescription>
                    Wager up to <span>{maxWager}</span> points on your answer. Winning
                    will add your wager to your round score. Losing will forfiet
                    the amount you wager.
                  </FormDescription>
                </div>
              )}
            </FormItem>
          )}
        />
        <div className="w-full flex-row flex justify-end">
          <Button type="submit" className="">Submit</Button>
        </div>
      </form>
    </Form>
  );
};

export default TextInput;
