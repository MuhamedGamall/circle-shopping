"use client";

import SectionTitle from "@/components/section-title";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React, { useState } from "react";

import { CheckPassword } from "./check-password";

export default function DeleteAccountSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="bg-white p-6 px-8 mb-10 ">
      <SectionTitle
        title="Account Deletion"
        className="mb-5 text-[17px] sm:text-[19px]"
      />
      <div className="flex justify-center flex-col gap-2">
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <span className="underline w-fit text-red-500 text-[16px] hover:no-underline cursor-pointer">
              Delete your account
            </span>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete your account?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Once your account is deleted, all of your data will be
                permanently removed. Please enter your password to confirm.
              </AlertDialogDescription>
              <CheckPassword setOpen={setOpen} />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="w-full">Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <p className="text-[#7e859b] ">
          We are sad to see you go, but hope to see you again!
        </p>
      </div>
    </section>
  );
}
