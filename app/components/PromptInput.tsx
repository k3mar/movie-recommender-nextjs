"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl, FormMessage } from "./ui/form";
import z from "zod";
import { Textarea } from "./ui/textarea";
import { useRecommendation } from "@/context/RecommendationContext";
import { AninmatedButton } from "./animated/AnimatedComponents";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";

const formSchema = z.object({
  query: z.string().nonempty({
    message: "Please enter specify the type of movie you are feeling for.",
  }),
});

const PromptInput = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const { mutate } = useRecommendation();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const id = uuidv4();
    mutate({ request_id: id, prompt: data.query });
  };

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-2 mt-20 font-bold"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder=" Let’s see what you’re feeling for today."
                  {...field}
                  className="dark:bg-white/90 bg-white resize-none  rounded-2xl overflow-y-auto h-[7.5rem] scroll-textarea text-black"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        ></FormField>
        <AninmatedButton
          type="submit"
          className="hover:bg-blue-800/70 px-4 py-2 mt-5 ml-auto mr-auto rounded-full dark:bg-slate-950/50  bg-blue-800 text-xs border-2 border-indigo-500/50 w-35 font-bold cursor-pointer"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          Match My Mood
          <Image
            src="/svg/movie-clapper.svg"
            alt="Clapper"
            width={20}
            height={20}
          />
        </AninmatedButton>
      </form>
    </Form>
  );
};

export default PromptInput;
