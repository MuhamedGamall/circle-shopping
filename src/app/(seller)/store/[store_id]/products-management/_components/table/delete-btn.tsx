import { DeleteConfirm } from "@/components/delete-confirm";
import { buttonVariants } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux";
import { deleteProduct_seller } from "@/lib/RTK/slices/seller/products-slice";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";

const DeleteBtn = ({
  store_id,
  product_id,
}: {
  store_id: string | string[];
  product_id: string | string[];
}) => {
  const dispatch = useAppDispatch();
  const onDelete = () => {
    dispatch(deleteProduct_seller({ store_id, product_id }));
  };

  return (
    <DeleteConfirm
      onDelete={() => onDelete()}
      title="Are you sure to delete this product?"
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
    </DeleteConfirm>
  );
};
export default DeleteBtn;
