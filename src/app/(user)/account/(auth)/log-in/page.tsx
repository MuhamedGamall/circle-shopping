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
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import * as z from "zod";

import AccountForm from "../_components/account-form";
import { formSchema } from "../schema";
import useProfile from "@/hooks/user-profile";

export default function LogInPage() {
  const [isError, setIsError] = useState<boolean>(false);
  const { data } = useProfile();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email:"",
      password: "",
    },
  });

  const { isValid } = form.formState;

  async function onSubmit(values: { password: string; email: string }) {
    const lol = signIn("credentials", {
      ...values,
      redirect: false,
      callbackUrl: "/",
    });
    await lol.then((res) =>
      res?.status === 401 ? setIsError(true) : setIsError(false)
    );
  }

  return (
    <MaxWidthWrapper>
      <section className="max-w-[800px] mx-auto my-10 px-5 ">
        <Card>
          <CardHeader className="space-y-1 ">
            <CardTitle className="text-2xl">Log in </CardTitle>
            <CardDescription>Enter your email below to Sig in</CardDescription>
          </CardHeader>

          <AccountForm onSubmit={onSubmit} form={form}>
            <CardFooter className="flex flex-col items-start mt-5  gap-2">
              {isError && (
                <span className="text-[14px] text-red-400 flex items-center gap-1">
                  <MdErrorOutline color="red" />
                  Wrong email or password
                </span>
              )}
              <span className="flex gap-1 items-center text-sm text-slate-700">
                Don&apos;t have an account?
                <Link href={"/create-account"} className="underline font-bold">
                  Sign up
                </Link>
              </span>
              <Button className="w-full" type="submit" disabled={!isValid}>
                Log in
              </Button>
            </CardFooter>
          </AccountForm>
        </Card>
      </section>
    </MaxWidthWrapper>
  );
}