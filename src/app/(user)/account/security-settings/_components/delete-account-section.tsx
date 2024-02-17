"use client";
import { DeleteConfirm } from "@/components/delete-confirm";
import SectionTitle from "@/components/section-title";
import { useAppDispatch } from "@/hooks/redux";
import useProfile from "@/hooks/user-profile";
import { deleteUser } from "@/lib/RTK/slices/user-slice";
import { signOut } from "next-auth/react";
import React from "react";

export default function DeleteAccountSection() {
  const dispatch = useAppDispatch();
  const { data } = useProfile();
  function onDelete() {
    try {
      dispatch(deleteUser(data?.email));
      signOut({ callbackUrl: "/" });
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  return (
    <section className="bg-white p-6 px-8 mb-10 ">
      <SectionTitle
        title="Account Deletion"
        className="mb-5 text-[17px] sm:text-[19px]"
      />
      <div className="flex justify-center flex-col gap-2">
        <DeleteConfirm
          title={"Are you sure you want to delete your account?"}
          description=" Once your account is deleted, all of your data will be permanently removed. Please enter your password to confirm."
          onDelete={onDelete}
        >
          <span className="underline w-fit text-red-500 text-[16px] hover:no-underline cursor-pointer">
            Delete your account
          </span>
        </DeleteConfirm>
        <p className="text-[#7e859b] ">
          We are sad to see you go, but hope to see you again!
        </p>
      </div>
    </section>
  );
}
