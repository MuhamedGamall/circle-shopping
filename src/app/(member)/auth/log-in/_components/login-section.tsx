"use client";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import * as z from "zod";
import AccountForm from "../../_components/account-form";
import { formSchema } from "../../schema";
import axios from "axios";
import Banner from "@/components/banner";
import React from "react";

export default function LoginClientComponent() {
  const [isError, setIsError] = useState<boolean>(false);
  const [banned, setBanned] = useState<null | {
    is_banned: boolean;
    reason: string;
  }>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const sign_in = await signIn("credentials", {
      ...values,
      redirect: false,
      callbackUrl: "/",
    });
    sign_in?.status === 401 ? setIsError(true) : setIsError(false);
    if (sign_in?.status !== 403) return;
    try {
      const banStatus = (
        await axios.get("/api/admin/users/" + values?.email + "/handle-ban")
      ).data;
      setBanned(banStatus);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {banned?.is_banned && (
        <Banner
          title="The account was suspended for the following reasons."
          details={[banned?.reason]}
          variant={"warning"}
          className="border-l-0"
          hiddeButton={true}
        />
      )}
      <AccountForm onSubmit={onSubmit} form={form}>
        <CardFooter className="flex flex-col items-start mt-5  gap-2">
          {isError && (
            <span className="text-[11px] text-red-500 flex items-center gap-1">
              <MdErrorOutline color="red" />
              Wrong email or password
            </span>
          )}
          {/* {isBanned &&
          (<span className="text-[11px] text-red-500 flex items-center gap-1">
            <MdErrorOutline color="red" />
            Wrong email or password
          </span>
          )} */}
          <span className="flex gap-1 items-center text-sm text-slate-700">
            Don&apos;t have an account?
            <Link href={"/auth/create-account"} className="underline font-bold">
              Sign up
            </Link>
          </span>
          <Button className="w-full" type="submit" disabled={!isValid}>
            Log in
          </Button>
        </CardFooter>
      </AccountForm>
    </div>
  );
}
