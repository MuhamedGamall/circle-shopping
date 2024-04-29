import { DeleteConfirm } from "@/components/delete-confirm";
import { buttonVariants } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/redux";
import { deleteCategory } from "@/lib/RTK/slices/admin/categories-slice";
import { cn } from "@/lib/utils";
import { Trash } from "lucide-react";

const DeleteBtn = ({ row }: { row: any }) => {
  const dispatch = useAppDispatch();

  return (
    <DeleteConfirm
      title="Are you sure to delete this category?"
      onDelete={() => dispatch(deleteCategory(row.getValue("_id")))}
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
