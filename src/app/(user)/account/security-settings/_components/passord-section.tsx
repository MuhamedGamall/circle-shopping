import SectionTitle from "@/components/section-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PasswordSection() {
  return (
    <section className="bg-white p-6 px-8 mb-10 ">
      <SectionTitle
        title="Security"
        className="mb-5 text-[17px] sm:text-[19px]"
      />
      <div className="flex justify-center-center  flex-col gap-2">
        <Label className="text-[16px] text-slate-700 font-normal">
          Password
        </Label>
        <div className="flex lg:items-center items-start  lg:flex-row flex-col gap-4">
          <Input
            type="password"
            disabled
            className="lg:w-[50%] rounded-sm w-full py-5 bg-slate-200 border-slate-300"
          />
          <Button
            className="rounded-sm lg:text-sm text-[11px] lg:py-5 lg:px-8 h-[35px] px-2"
            variant={"outline"}
            size={"lg"}
          >
            CHANGE PASSWORD
          </Button>
        </div>
      </div>
    </section>
  );
}
