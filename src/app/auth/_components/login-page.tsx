"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SocialIcon } from "react-social-icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { logInForm } from "../_constant/constant";
import { userZodSchema, userZodSchemaForLogin } from "@/schema/userZodSchema";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type SignUpFormType = z.infer<typeof userZodSchemaForLogin>;

export function LogInForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignUpFormType) => {
    console.log(data);
    try {
      setLoading(true);
      const resp = await signIn("credentials", {
        redirect: false,
        ...data,
      });
        
      if (resp && resp.ok) {
        router.push("/");
      } else {
        toast({
          title: "Error",
          description: resp?.error,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };

  const form = useForm<SignUpFormType>({
    resolver: zodResolver(userZodSchemaForLogin),
    defaultValues: {
      email: "demo@gmail.com",
      password: "password",
    },
  });

  return (
    <div className="max-w-lg mx-auto w-full  p-2 mt-[5%] space-y-5">
      <h1 className="text-center font-semibold text-3xl">Log In</h1>
      <Button variant={"destructive"} size={"xl"} className=" w-full text-lg">
        <SocialIcon
          style={{ height: "30px", width: "30px" }}
          url="www.google.com"
        />
        Continue with Google
      </Button>
      <Button variant={"outline"} size={"xl"} className="w-full text-lg">
        <SocialIcon
          style={{ height: "30px", width: "30px" }}
          url="www.github.com"
        />
        Continue with Github
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {logInForm.map((item) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{item.label}</FormLabel>
                  <FormControl>
                    <Input
                      className="h-[50px]"
                      placeholder={item.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            disabled={loading}
            size={"lg"}
            className="w-full"
            type="submit"
          >
            {loading ? "Loading...." : "Continue"}
          </Button>
        </form>
      </Form>
      <p
        onClick={() => router.push("/auth/signup")}
        className="text-center cursor-pointer underline"
      >
        Don't have an account?
      </p>
    </div>
  );
}
