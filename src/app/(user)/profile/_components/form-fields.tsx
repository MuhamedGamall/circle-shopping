"use client";
import CustomField from "@/components/custom-field";
import { Button } from "@/components/ui/button";

import { Form, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import useProfile from "@/hooks/user-profile";
import { profileSchema } from "../schima";
import SelectCountry from "./select-country";

export default function FormFields({
  onSubmit,
}: {
  onSubmit: (val: any) => Promise<void>;
}) {
  const [country, setCountry] = useState("");
  const { data } = useProfile();

  const firstName = data?.name?.split(" ")?.[0] || "";
  const lastName = data?.name?.split(" ")?.[1] || "";

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
    values: {
      first_name: firstName,
      last_name: lastName,
      email: data?.email || "",
      phone: data?.phone || "",
      street_address: data?.street_address || "",
      city: data?.city || "",
      postal_code: data?.postal_code || "",
      country: data?.country || "",
    },
  });

  const { isSubmitting, isSubmitted } = form.formState;
  const isValid = Object.values(form.getValues()).every(Boolean);

  return (
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
            className={"rounded-sm py-5 cursor-not-allowed"}
            placeholder={"example@gmail.com"}
          />
          <CustomField
            label="First Name *"
            labelClassName={"text-slate-700"}
            form={form}
            disabled={isSubmitting}
            name="first_name"
            type={"text"}
            minLength={3}
            maxLength={30}
            className={"rounded-sm py-5"}
            placeholder="first name"
          />
          <CustomField
            label="Last Name *"
            labelClassName={"text-slate-700"}
            form={form}
            disabled={isSubmitting}
            name="last_name"
            type={"text"}
            minLength={3}
            maxLength={30}
            className={"rounded-sm py-5"}
            placeholder="last name"
          />
          <CustomField
            label="Phone number *"
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
              <FormLabel className={"text-slate-700"}>Country *</FormLabel>
              <SelectCountry
                form={form}
                setCountry={setCountry}
                country={country}
                disabled={isSubmitting}
              />
            </div>
            {isSubmitted && !form.getValues("country") && (
              <span className="text-red-700 text-sm font-semibold">
                Invalid Field.
              </span>
            )}
          </div>
          <CustomField
            label="City *"
            labelClassName={"text-slate-700"}
            form={form}
            disabled={isSubmitting}
            name="city"
            type={"text"}
            minLength={2}
            maxLength={48}
            className={"rounded-sm py-5"}
            placeholder="City"
          />
          <CustomField
            label="Street address *"
            labelClassName={"text-slate-700"}
            form={form}
            disabled={isSubmitting}
            name="street_address"
            type={"text"}
            minLength={5}
            maxLength={191}
            className={"rounded-sm py-5"}
            placeholder="Street address"
          />
          <CustomField
            label="Postal code *"
            labelClassName={"text-slate-700"}
            form={form}
            disabled={isSubmitting}
            name="postal_code"
            type={"text"}
            minLength={4}
            maxLength={6}
            className={"rounded-sm py-5"}
            placeholder="Postal code"
          />
        </div>
        <Button
          type="submit"
          className="w-fit rounded-sm"
          disabled={isSubmitting || !isValid}
        >
          UPDATE PROFILE
        </Button>
      </form>
    </Form>
  );
}
