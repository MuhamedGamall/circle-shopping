import { ColumnDef } from "@tanstack/react-table";

import Icons from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/format";
import { formatDate } from "date-fns";
import { ArrowUpDown, Trash, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import SubCategoriesMenu from "./sub-categories-menu";
import { DeleteConfirm } from "@/components/delete-confirm";
import { useAppDispatch } from "@/hooks/redux";
import { deleteCategory } from "@/lib/RTK/slices/categories-slice";
import DeleteBtn from "./delete-btn";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "image",
    header: ({ column }) => {
      return <div className="">Image</div>;
    },
    cell: ({ row }: any) => {
      const image = row.getValue("main_category")?.image;
      return image ? (
        <Image
          src={image}
          alt="image"
          width={600}
          height={819}
          loading="lazy"
          className=" mx-auto uppercase  max-w-[60px] min-w-[60px] h-[82px] object-cover"
        />
      ) : (
        <div className=" mx-auto w-[60px] h-[82px] bg-[#f7f6fb] flex items-center justify-center text-sm">
          <div className="opacity-[.7]">
            <Icons.logo h="20" w="20" />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "main_category",
    header: ({ column }) => {
      return <div className="uppercase">Main Category</div>;
    },
    cell: ({ row }: any) => {
      return (
        <span className=" max-w-[150px] overflow-x-auto  text-center   whitespace-nowrap">
          {row.getValue("main_category")?.name || "--"}
        </span>
      );
    },
  },
  {
    accessorKey: "sub_categories",
    header: ({ column }) => {
      return <div className="uppercase">Sub Categories</div>;
    },
    cell: ({ row }: any) => {
      console.log(row.getValue());

      return (
        <div className=" max-w-[150px] overflow-x-auto text-center  whitespace-nowrap">
          <SubCategoriesMenu data={row?.original} />
        </div>
      );
    },
  },
  {
    accessorKey: "_id",
    header: ({ column }) => {
      return <div className="uppercase">Category ID</div>;
    },
    cell: ({ row }) => {
      return (
        <Link
          href={"/admin/categories/" + row.getValue("_id") + "/update"}
          className="block whitespace-nowrap  text-center  max-w-[150px] overflow-x-auto font-semibold text-[#3866df]"
        >
          {row.getValue("_id")}
        </Link>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          className="uppercase "
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt: string = row.getValue("createdAt");
      return (
        <div className=" text-center  font-medium lowercase max-w-[150px] overflow-x-auto whitespace-nowrap">
          {formatDate(createdAt, "dd/MM/yyyy HH:mm:ss")}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
          className="uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Updated at
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const updatedAt: string = row.getValue("updatedAt");
      return (
        <div className=" text-center  font-medium lowercase max-w-[150px] overflow-x-auto whitespace-nowrap">
          {formatDate(updatedAt, " dd/MM/yyyy HH:mm:ss")}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: ({ column }) => {
      return <div className="uppercase">actions</div>;
    },
    cell: ({ row }: any) => {
      return (
        <div className="flex items-center gap-1">
          <Link
            href={"/admin/categories/" + row.getValue("_id") + "/update"}
            className={cn(
              buttonVariants({
                variant: "blue",
                className: " w-fit text-[13px] h-[28px] px-4    ",
              })
            )}
          >
            Fix
          </Link>
          <DeleteBtn row={row} />
        </div>
      );
    },
  },
];
