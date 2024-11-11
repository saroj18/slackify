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
import { signUpForm } from "../_constant/constant";
import { userZodSchema } from "@/schema/userZodSchema";
import { useRouter } from "next/navigation";
import { Request } from "@/utils/axios";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { useState } from "react";

type SignUpFormType = z.infer<typeof userZodSchema>;

export function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: SignUpFormType) => {
    try {
      console.log(data);
      const resp = await Request.post("/api/signup", data);

      if (resp.data) {
        toast({
          title: "Success",
          description: resp.data.message,
          variant: "default",
        });
        router.push("/auth/signin");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response.data.error,
        variant: "destructive",
      });
    }
  };

  const form = useForm<SignUpFormType>({
    resolver: zodResolver(userZodSchema),
    defaultValues: {
      username: "demoUser",
      email: "demo@gmail.com",
      password: "password",
    },
  });

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      const resp = await signIn("google", {
        redirect: false,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Internal Server Error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loginWithGithub = async () => {
    try {
      setLoading(true);
      const resp = await signIn("github", {
        redirect: false,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Internal Server Error",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto w-full  p-2 mt-[5%] space-y-5">
      <h1 className="text-center font-semibold text-3xl">Sign Up</h1>
      <Button
        onClick={loginWithGoogle}
        variant={"destructive"}
        size={"xl"}
        className=" w-full text-lg"
      >
        <SocialIcon
          style={{ height: "30px", width: "30px" }}
          url="www.google.com"
        />
        Continue with Google
      </Button>
      <Button
        disabled={loading}
        onClick={loginWithGithub}
        variant={"outline"}
        size={"xl"}
        className="w-full text-lg"
      >
        <SocialIcon
          style={{ height: "30px", width: "30px" }}
          url="www.github.com"
        />
        Continue with Github
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          {signUpForm.map((item) => (
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
        onClick={() => router.push("/auth/signin")}
        className="text-center cursor-pointer underline"
      >
        Already have account?
      </p>
    </div>
  );
}
