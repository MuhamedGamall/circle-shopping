import CreateAccountSection from "./_components/create-account-section";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CreateAccountPage() {
  return (
    <section className="max-w-[800px] mx-auto my-10 px-5 ">
      <Card className="rounded-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CreateAccountSection />
      </Card>
    </section>
  );
}
