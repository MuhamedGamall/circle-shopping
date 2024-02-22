"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import toast from "react-hot-toast";
import { formSchema } from "../../schema";
import AccountForm from "../../_components/account-form";

export default function CreateAccountClientComponent() {
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsError(false);
      console.log("lol");

      const res = await axios.post("/api/create-account", values);
      console.log(res);

      router.replace("/auth/log-in");
      toast.success("Account created successfully");
    } catch (error: any) {
      if (error.response.status !== 409)
        toast.error("Uh oh! Something went wrong try again");
      error.response.status === 409 ? setIsError(true) : setIsError(false);
    }
  }

  return (
    <MaxWidthWrapper>
      <section className="max-w-[800px] mx-auto my-10 px-5 ">
        <Card>
          <CardHeader className="space-y-1 ">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>

          <AccountForm onSubmit={onSubmit} form={form}>
            <CardFooter className="flex flex-col items-start mt-5  gap-2">
              <span className="text-[14px] text-red-400">
                {isError && "This account already exists."}
              </span>
              <span className="flex gap-1 items-center text-sm text-slate-700">
                Already have an account?&nbsp;
                <Link href={"/auth/log-in"} className="underline font-bold">
                  Log in
                </Link>
              </span>
              <Button className="w-full" type="submit" disabled={!isValid}>
                Create account
              </Button>
            </CardFooter>
          </AccountForm>
        </Card>
      </section>
    </MaxWidthWrapper>
  );
}
