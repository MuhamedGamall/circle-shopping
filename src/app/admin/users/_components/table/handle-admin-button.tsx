import getCEOEmail from "@/actions/get-ceo-email";
import { Button } from "@/components/ui/button";
import { TooltipWrapper } from "@/components/wrappers/tooltip-wrapper";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function HandleAdminBtn({
  admin,
  user_id,
}: {
  admin: boolean;
  user_id: string;
}) {
  const session = useSession();
  const personalEmail = session?.data?.user?.email;
  const [isAdmin, setIsAdmin] = useState(false);
  const [CEOEmail, setCEOEmail] = useState<string | undefined>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isCEO = personalEmail === CEOEmail;
  useEffect(() => {
    setIsAdmin(admin);
  }, [admin]);

  useEffect(() => {
    async function fetchCEOEmail() {
      const CEOEmail = await getCEOEmail();
      setCEOEmail(CEOEmail);
    }
    fetchCEOEmail();
  }, [personalEmail]);

  async function onSubmit() {
    if (!isCEO)
      return toast.error(
        "Apologies, but you are not authorized for the requested action."
      );

    try {
      setIsSubmitting(true);
      await axios.patch("/api/admin/users/" + user_id + "/handle-admin", {
        admin: !isAdmin,
      });
      setIsAdmin(!isAdmin);
    } catch (error) {
      console.log("error updating admin", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <TooltipWrapper label="Make User an Admin or Remove Access">
      <Button
        onClick={onSubmit}
        size={"sm"}
        disabled={!isCEO || isSubmitting}
        className={cn(
          "bg-slate-500 rounded-sm whitespace-nowrap px-2 h-[25px] text-[11px]",
          {
            "bg-green-500": isAdmin,
          }
        )}
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isAdmin ? (
          "Admin"
        ) : (
          "Not admin"
        )}
      </Button>
    </TooltipWrapper>
  );
}
