import CustomField from "@/components/custom-field";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { BsGoogle } from "react-icons/bs";

export default function AccountForm({
  children,
  onSubmit,
  form,
}: {
  children: ReactNode;
  onSubmit: (value: { email: string; password: string }) => Promise<void>;
  form: any;
}) {
  const session = useSession();

  const { isSubmitting } = form.formState;

  if (session.status === "authenticated") {
    redirect("/");
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 relative ">
        <CardContent className="grid gap-4 ">
          <div className="w-full">
            <Button
              type="button"
              onClick={() =>
                signIn("google", {
                  redirect: false,
                  callbackUrl: "/",
                })
              }
              variant="outline"
              className="w-full"
            >
              <BsGoogle className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <CustomField
            label="Email"
            labelClassName={"text-slate-700"}
            form={form}
            name={"email"}
            disabled={isSubmitting}
            type={"email"}
            className={" "}
            placeholder={"example@gmail.com"}
          />
          <CustomField
            label="Password"
            labelClassName={"text-slate-700"}
            form={form}
            disabled={isSubmitting}
            name={"password"}
            type={"password"}
            className={" "}
            placeholder={"password"}
          />
        </CardContent>

        {children}
      </form>
    </Form>
  );
}
