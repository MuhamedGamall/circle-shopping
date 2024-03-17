"use client";
import { buttonVariants } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux";
import { unpublishProduct_admin } from "@/lib/RTK/slices/admin-slices/products-slice";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import DeleteConfirm from "./delete-reason";
import toast from "react-hot-toast";
import axios from "axios";

const UnpublishBtn = ({
  store_id,
  product_id,
  store_personal_email,
}: {
  store_id: string;
  product_id: string | string[];
  store_personal_email: string;
}) => {
  const dispatch = useAppDispatch();
  const onSubmit = async (reasonSelectedValue: string) => {
    if (!reasonSelectedValue) return toast.error("Please select a reason");
    try {
      dispatch(
        unpublishProduct_admin({
          store_id,
          product_id,
          store_personal_email,
        })
      );
      await axios.post("/api/admin/notifications", {
        store_id,
        product_id,
        personal_email: store_personal_email,
        message: reasonSelectedValue,
      });
    } catch (err) {
      console.log("error when delete product", err);
    }
  };

  return (
    <DeleteConfirm onDelete={onSubmit}>
      <div
        className={cn(
          buttonVariants({
            className:
              "bg-red-800 hover:bg-red-900 rounded-sm  w-fit text-[13px] h-[28px] px-2  ",
          })
        )}
      >
        <Trash className="h-4 w-4" />
      </div>
    </DeleteConfirm>
  );
};
export default UnpublishBtn;
