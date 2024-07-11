"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { PostItemformSchema } from "@/lib/validations";
import { createItemAction } from "@/lib/actions";

export function PostItem() {
  const form = useForm<z.infer<typeof PostItemformSchema>>({
    resolver: zodResolver(PostItemformSchema),
    defaultValues: {
      name: "",
      startingPrice: "",
    },
  });
  async function onSubmit(data: z.infer<typeof PostItemformSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      await createItemAction(data);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 border p-3 w-1/4 border-gray-500 rounded-md"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of your Item </FormLabel>
              <FormControl>
                <Input placeholder="Bag" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startingPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Starting Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="2"
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Regular expression to allow digits and optionally one decimal point
                    if (/^\d*\.?\d{0,2}$/.test(value)) {
                      field.onChange(value); // Update form field value
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
