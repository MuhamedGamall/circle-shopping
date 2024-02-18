import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomField from "@/components/custom-field";
import * as z from "zod";
import { changePasswordSchema } from "../schema";

import axios from "axios";
import toast from "react-hot-toast";

export function ChangePassword() {
  const [passIsMatch, setPassIsMatch] = useState(true);
  const [passIsCorrect, setPassIsCorrect] = useState(true);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });



  const onSubmit = async (values: any) => {
    if (values.new_password !== values.confirm_password) {
      setPassIsMatch(false);
      return;
    }
    setPassIsMatch(true);

    try {
      const req = await axios.put("/api/profile", {
        confirmPassword: values.confirm_password,
        currPass: values.current_password,
      });

      if (req.status === 200) {
        setPassIsCorrect(true);
        toast.success("Password updated successfully!");
        setOpen(false)
      }
    } catch (error: any) {
      if (error?.response?.status !== 406) {
        toast.error("Something went wrong try again");
      } else if (error?.response?.status === 406) {
        setPassIsCorrect(false);
      }
    }
  };

  const { isSubmitting, isValid } = form.formState;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-col gap-3">
          <Button
            className="rounded-sm text-[14px]  h-[35px] px-3 w-fit"
            variant={"outline"}
            size={"lg"}
          >
            CHANGE PASSWORD
          </Button>
          <p className="text-[#7e859b] ">
            To change your password, you must have the current password.
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-sm">
        <DialogHeader className="mb-3">
          <DialogTitle className="text-[25px]">Change password</DialogTitle>
        </DialogHeader>
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
              name={"current_password"}
              type={"password"}
              className={"rounded-sm py-5 "}
            />
            <span className="text-red-500 text-[11px] mt-2">
              {!passIsCorrect ? "Incorrect password. Please try again." : ""}
            </span>
            <CustomField
              label="New password"
              labelClassName={"text-slate-700"}
              form={form}
              disabled={isSubmitting}
              name={"new_password"}
              type={"password"}
              minLength={5}
              maxLength={100}
              className={"rounded-sm py-5"}
            />
            <CustomField
              label="Confirm password"
              labelClassName={"text-slate-700"}
              form={form}
              disabled={isSubmitting}
              name={"confirm_password"}
              type={"password"}
              minLength={5}
              maxLength={100}
              className={"rounded-sm py-5"}
            />
            <span className="text-red-500 text-[11px] mt-2">
              {!passIsMatch ? "Passwords do not match" : ""}
            </span>

            <DialogFooter>
              <Button type="submit" disabled={!isValid}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
