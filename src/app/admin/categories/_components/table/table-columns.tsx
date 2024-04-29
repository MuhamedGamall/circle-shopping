import { ColumnDef } from "@tanstack/react-table";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DeleteBtn from "./delete-btn";
import SubCategoriesMenu from "./sub-categories-menu";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "image",
    header: ({ column }) => {
      return <div className="uppercase">Image</div>;
    },
    cell: ({ row }: any) => {
      const image = row.getValue("main_category")?.image;
      return (
        <Image
          src={image}
          alt="image"
          width={600}
          height={819}
          loading="lazy"
          className=" mx-auto uppercase  max-w-[62px] min-w-[62px] h-[62px] object-cover"
        />
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
