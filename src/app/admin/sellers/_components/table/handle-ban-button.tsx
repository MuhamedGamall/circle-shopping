import DeleteReasonsBtn from "@/components/delete-reason-button";
import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/wrappers/tooltip-wrapper";
import { useAppDispatch } from "@/hooks/redux";
import { handleSellerBan } from "@/lib/RTK/slices/admin/sellers";
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
  "Not responding to users' requests",
  "Failure to fulfill orders",
];
export default function HandleBanBtn({
  ban,
  personal_email,
  seller_id,
}: {
  ban: { is_banned: boolean; message: string };
  personal_email: string;
  seller_id: string;
}) {
  const [isBanned, setIsBanned] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const session = useSession();
  const personalEmail = session?.data?.user?.email;
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsBanned(ban?.is_banned);
  }, [ban?.is_banned]);

  async function onSubmit(reason: any) {
    if (personal_email === personalEmail)
      return toast.error(
        "You are not authorized for the requested action on yourself."
      );

    try {
      setIsSubmitting(true);
    const update =  await axios.patch("/api/admin/sellers/" + seller_id + "/handle-ban", {
        ban: { is_banned: !isBanned, reason },
      });
      if (update?.status === 200) {
        dispatch(handleSellerBan({ _id: seller_id, isBanned: !isBanned }));
        setIsBanned(!isBanned);
      }
    } catch (error) {
      console.log("error updating ban", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <TooltipWrapper label="Make or unmake a user inactive">
      {!isBanned ? (
        <DeleteReasonsBtn
          reasons={reasons}
          onClick={onSubmit}
          title="Ban Store"
          description="Select an option below to provide a reason for banned account. This information will be used to message the seller."
        >
          <Button
            size="sm"
            disabled={isSubmitting || personal_email === personalEmail}
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
          disabled={isSubmitting || personal_email === personalEmail}
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
