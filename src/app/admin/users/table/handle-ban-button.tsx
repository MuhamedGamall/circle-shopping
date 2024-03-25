import getCEOEmail from "@/actions/get-ceo-email";
import DeleteReasonsBtn from "@/components/delete-reason-button";
import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/wrappers/tooltip-wrapper";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const reasons = [
  "Violation of usage policies",
  "Breach of local or international laws/regulations",
  "Violation of intellectual property rights",
  "Undesirable behavior",
  "Providing false information",
  "Response to user requests",
  "Failure to fulfill orders",
];
export default function HandleBanBtn({
  ban,
  email,
}: {
  ban: { is_banned: boolean; message: string };
  email: string;
}) {
  const session = useSession();
  const personalEmail = session?.data?.user?.email;
  const [isBanned, setIsBanned] = useState(false);
  const [CEOEmail, setCEOEmail] = useState<string | undefined>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isCEO = personalEmail === CEOEmail;
  useEffect(() => {
    setIsBanned(ban?.is_banned);
  }, [ban?.is_banned]);

  useEffect(() => {
    async function fetchCEOEmail() {
      const CEOEmail = await getCEOEmail();
      setCEOEmail(CEOEmail);
    }
    fetchCEOEmail();
  }, [personalEmail]);

  async function onSubmit(reason: any) {
    if (!isCEO)
      return toast.error(
        "Apologies, but you are not authorized for the requested action."
      );

    if (personalEmail === email)
      return toast.error(
        "You can't do that for yourself, because you are the CEO of the company."
      );

    try {
      setIsSubmitting(true);
      await axios.patch("/api/admin/users/" + email + "/handle-ban", {
        ban: { is_banned: !isBanned, reason },
      });
      setIsBanned(!isBanned);
    } catch (error) {
      console.log("error updating ban", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return email === CEOEmail ? (
    <TooltipWrapper label="you can't access this user">
      <span className="bg-black cursor-not-allowed text-white rounded-sm whitespace-nowrap px-3 font-semibold py-1 text-[11px]">
        CEO
      </span>
    </TooltipWrapper>
  ) : (
    <TooltipWrapper label="Make or unmake a user inactive">
      {!isBanned ? (
        <DeleteReasonsBtn
          reasons={reasons}
          onClick={onSubmit}
          title="Ban User"
          description="Select an option below to provide a reason for banned account. This information will be used to message the user."
        >
          <Button
            size="sm"
            disabled={!isCEO || isSubmitting}
            className={`bg-slate-500 rounded-sm whitespace-nowrap px-2 h-[25px] text-[11px]`}
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Banned"
            )}
          </Button>
        </DeleteReasonsBtn>
      ) : (
        <Button
          onClick={() => onSubmit("")}
          size="sm"
          disabled={!isCEO || isSubmitting}
          className={` rounded-sm whitespace-nowrap px-2 h-[25px] text-[11px] bg-red-500`}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Unbanned"
          )}
        </Button>
      )}
    </TooltipWrapper>
  );
}
