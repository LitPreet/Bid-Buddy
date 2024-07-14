"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/app/firebaseConfig";
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
import { useEffect, useState } from "react";
import { calculateSizeAdjustValues } from "next/dist/server/font-utils";
import Spinner from "../spinner";
import { DatePickerDemo } from "../date-picker";
import { useToast } from "../ui/use-toast";

export function PostItem() {
  const [file, setFile] = useState<File | null>(null); // State to store the selected file
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null); // State to store the uploaded image URL
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const { toast } = useToast()
  const form = useForm<z.infer<typeof PostItemformSchema>>({
    resolver: zodResolver(PostItemformSchema),
    defaultValues: {
      name: "",
      startingPrice: "",
      file: "",
    },
  });

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFile(event.target.files?.[0]!);
  };

  const handleUpload = async () => {
    if (file) {
      const storageRef = ref(storage, `images/${file.name}`); // Create a reference to the file in Firebase Storage

      try {
        await uploadBytes(storageRef, file); // Upload the file to Firebase Storage
        const url = await getDownloadURL(storageRef); // Get the download URL of the uploaded file
        console.log("File Uploaded Successfully");
        return url;
        // setUploadedUrl(url); // Set the uploaded image URL
        // Update form value with the uploaded URL
        // form.clearErrors('file');
      } catch (error) {
        console.error("Error uploading the file", error);
      }
    }
  };

  async function onSubmit(data: z.infer<typeof PostItemformSchema>) {
    if (!date) {
      toast({
        variant: "destructive",
        description: "Please pick a date before submitting.",
      })
      return;
    }
    setIsSubmitting(true);
    try {
      const {name,startingPrice} = data
      const fileUrl = await handleUpload();
      if (fileUrl !== null) {
        await createItemAction({ name, startingPrice: parseInt(startingPrice, 10), file: fileUrl! ,endDate:date});
        console.log({ ...data, file: fileUrl! });
      }
    } catch (error) {
      console.error("Error creating item:", error);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 border p-3 lg:w-1/4 border-gray-500 rounded-md"
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
        <DatePickerDemo date={date} setDate={setDate}/>
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Choose the File</FormLabel>
              <FormControl>
                <Input type="file" {...field} onChange={handleFileChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {" "}
          {isSubmitting ? (
            <>
              Submitting <Spinner />
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
