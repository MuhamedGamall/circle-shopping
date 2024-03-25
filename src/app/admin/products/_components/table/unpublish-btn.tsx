"use client";
import { buttonVariants } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux";
import { unpublishProduct } from "@/lib/RTK/slices/products-slice";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";
import DeleteReasonsBtn from "@/components/delete-reason-button";
import toast from "react-hot-toast";
import axios from "axios";
const reasons = [
  "Featuring photos of adult nudity or pornography",
  "Promoting hate speech, discrimination, or violence against any individual or group based on race, ethnicity, national origin",
  "Product data is incomplete",
  "Violation of intellectual property rights or copyright infringement",
  "Selling counterfeit or fraudulent products",
  "Product is expired or past its use-by date",
  "Item is prohibited or restricted by law or regulation",
  "Product description contains misleading or false information",
  "Product does not meet safety standards or poses health risks",
  "Multiple customer complaints about the product quality or functionality",
  "Repeated instances of late or non-delivery of the product",
  "Manufacturer recalls or warnings regarding the product",
  "Product is deemed environmentally harmful or unsustainable",
];
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
        unpublishProduct({
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
    <DeleteReasonsBtn
      onClick={onSubmit}
      title="Choose why you delete this product"
      description="Select an option below to provide a reason for deleting the product,
    This information will be used to messaged to the user who posted it."
      reasons={reasons}
    >
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
    </DeleteReasonsBtn>
  );
};
export default UnpublishBtn;
