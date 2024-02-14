"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import Link from "next/link";
import { BsGoogle } from "react-icons/bs";

export default function CreateAccountPage() {
  return (
    <MaxWidthWrapper>
      <section className="max-w-[800px] mx-auto my-10 px-5 ">
        <Card>
          <CardHeader className="space-y-1 ">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="w-full">
              <Button variant="outline" className="w-full">
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
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start mt-5 gap-2">
            <span className="flex gap-1 items-center text-sm text-slate-700">
              Already have an account?&nbsp;
              <Link href={"/login"} className="underline font-bold">
                Log in
              </Link>
            </span>
            <Button className="w-full">Create account</Button>
          </CardFooter>
        </Card>
      </section>
    </MaxWidthWrapper>
  );
}
