"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { profileSchema } from "./schima";
import CustomField from "@/components/custom-field";
import SectionTitle from "@/components/section-title";
import SelectCountry from "./_components/select-country";

export default function ProfilePage() {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      street_address: "",
      city: "",
      postal_code: "",
      country: "",
    },
  });

  const onSubmit = () => {
    console.log(form.getValues("country"));
  };
  const { isSubmitting, isSubmitted, isValid } = form.formState;
console.log(isValid);

  return (
    <section className="bg-white p-8 my-10">
      <SectionTitle title="Profile info" className="mb-5" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-4 w-full flex flex-col"
        >
          <div className="items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7">
            <CustomField
              label="Email"
              labelClassName={"text-slate-700"}
              form={form}
              disabled
              name={"email"}
              type={"email"}
              className={"rounded-sm py-5"}
              placeholder={"example@gmail.com"}
            />
            <CustomField
              label="First Name"
              labelClassName={"text-slate-700"}
              form={form}
              disabled={isSubmitting}
              name="first_name"
              type={"text"}
              minLength={1}
              maxLength={30}
              className={"rounded-sm py-5"}
              placeholder="first name"
            />
            <CustomField
              label="Last Name"
              labelClassName={"text-slate-700"}
              form={form}
              disabled={isSubmitting}
              name="last_name"
              type={"text"}
              minLength={1}
              maxLength={30}
              className={"rounded-sm py-5"}
              placeholder="last name"
            />
            <CustomField
              label="Phone number"
              labelClassName={"text-slate-700"}
              form={form}
              disabled={isSubmitting}
              name="phone"
              type={"tel"}
              minLength={10}
              maxLength={20}
              className={"rounded-sm py-5"}
              placeholder="Mobile number"
            />
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-4">
                <FormLabel className={"text-slate-700"}>Country</FormLabel>
                <SelectCountry form={form} />
              </div>
              {isSubmitted && !form.getValues("country") && (
                <span className="text-red-700 text-sm font-semibold">
                  Field is required.
                </span>
              )}
            </div>
            <CustomField
              label="Postal code"
              labelClassName={"text-slate-700"}
              form={form}
              disabled={isSubmitting}
              name="postal_code"
              type={"string"}
              minLength={4}
              maxLength={6}
              className={"rounded-sm py-5"}
              placeholder="Postal code"
            />
          </div>
          <Button
            type="submit"
            className="w-fit rounded-sm"
            disabled={isSubmitting }
          >
            UPDATE PROFILE
          </Button>
        </form>
      </Form>
    </section>
  );
}
