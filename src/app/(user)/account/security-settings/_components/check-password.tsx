import CustomField from "@/components/custom-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { checkPassword } from "../schema";
import { useAppDispatch } from "@/hooks/redux";
import { deleteUser } from "@/lib/RTK/slices/user-slice";
import useProfile from "@/hooks/user-profile";
import bcryptDecode from "@/actions/bcrypt-decode";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export function CheckPassword({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();
  const [passIsCorrect, setPassIsCorrect] = useState(true);
  const { data } = useProfile();
  const router = useRouter();
  const form = useForm<z.infer<typeof checkPassword>>({
    resolver: zodResolver(checkPassword),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (values: any) => {
    const checkPass = await bcryptDecode({
      confirmPassword: values?.password || "",
      currPassword: data?.password || "",
    });

    if (checkPass) {
      try {
        setPassIsCorrect(true);
        dispatch(deleteUser(data?.email));
        setOpen(false);
        setTimeout(() => {
          signOut({ callbackUrl: "/" });
        }, 2000);
      } catch (error) {
        console.log("Error: ", error);
      }
    } else {
      setPassIsCorrect(false);
    }
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-4 w-full flex flex-col"
        >
          <CustomField
            label="Current password"
            labelClassName={"text-slate-700"}
            form={form}
            disabled={isSubmitting}
            name={"password"}
            type={"password"}
            className={"rounded-sm py-6 "}
          />
          <span className="text-red-500 text-[11px] mt-2">
            {!passIsCorrect ? "Incorrect password. Please try again." : ""}
          </span>
          <Button type="submit" disabled={!isValid} className="bg-blue-600 hover:bg-blue-800">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
