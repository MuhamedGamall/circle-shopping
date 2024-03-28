"use client";

import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

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

export default function CreateAccountSection() {
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
      await axios.post("/api/create-account", values);
      router.replace("/auth/log-in");
      toast.success("Account created successfully");
    } catch (error: any) {
      if (error.response.status !== 409)
        toast.error("Uh oh! Something went wrong try again");
      error.response.status === 409 ? setIsError(true) : setIsError(false);
    }
  }

  return (
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
  );
}
