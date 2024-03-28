import CustomField from "@/components/custom-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { checkPassword } from "../schema";
import { useAppDispatch } from "@/hooks/redux";
import useAccount from "@/hooks/use-account";
import bcryptDecode from "@/actions/bcrypt-decode";
import { signOut } from "next-auth/react";
import LoaderLayout from "@/components/loader-layout";
import { deleteAccount } from "@/lib/RTK/slices/account-slice";

export function CheckPassword({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();
  const [passIsCorrect, setPassIsCorrect] = useState(true);
  const { data, loading } = useAccount();
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
        dispatch(deleteAccount(data?.email));
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
          <LoaderLayout loadingCondition={isSubmitting || loading} />
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
          <Button type="submit" disabled={!isValid} variant={"blue"}>
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
