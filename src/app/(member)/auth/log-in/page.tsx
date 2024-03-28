import LoginClientComponent from "./_components/login-section";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LogInPage() {
  return (
    <section className="max-w-[800px] mx-auto my-10 px-5 ">
      <Card className="rounded-sm">
        <CardHeader className="space-y-1 ">
          <CardTitle className="text-2xl">Log in </CardTitle>
          <CardDescription>Enter your email below to Sig in</CardDescription>
        </CardHeader>
        <LoginClientComponent />
      </Card>
    </section>
  );
}
