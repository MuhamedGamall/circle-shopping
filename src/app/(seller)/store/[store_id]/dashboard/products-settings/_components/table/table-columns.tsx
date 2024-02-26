import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Icons from "@/components/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { formatDate, formatPrice } from "@/utils/format";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",

    header: ({ column }) => {
      return <div className="">Product details</div>;
    },
    cell: ({ row }: any) => {
      return row.getValue("image") ? (
        <Image
          src={row.getValue("image")}
          alt="image"
          width={600}
          height={819}
          loading="lazy"
          className=" rounded-md w-[60px] h-[82px] object-cover"
        />
      ) : (
        <div className=" w-[60px] h-[82px] bg-[#f7f6fb] flex items-center justify-center text-sm">
          <div className="opacity-[.7]">
            <Icons.logo h="20" w="20" />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return <div className="">Category</div>;
    },
    cell: ({ row }: any) => {
      return (
        <div className="flex flex-col justify-center  max-w-[150px] overflow-x-auto ">
          <span className="text-[16px] font-bold whitespace-nowrap">
            {row.getValue("category")?.brand?.title || "--"}
          </span>
          <span className="text-[16px]  whitespace-nowrap">
            {row.getValue("category")?.main_category?.title || "--"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "_id",
    header: ({ column }) => {
      return <div className="">Product ID</div>;
    },
    cell: ({ row }) => {
      function ProductIdLink() {
        const { store_id } = useParams();

        return (
          <Link
            href={
              "/store/" +
              store_id +
              "/dashboard/products-settings/" +
              row.getValue("_id") +
              "/update-product"
            }
            className="block whitespace-nowrap max-w-[150px] overflow-x-auto font-semibold text-[#3866df]"
          >
            {row.getValue("_id")}
          </Link>
        );
      }

      return <ProductIdLink />;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div className="">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            price
            <ArrowUpDown className="ml-2 h-4 w-4 " />
          </Button>
        </div>
      );
    },
    cell: ({ row }: any) => {
      return (
        <div className=" whitespace-nowrap max-w-[150px] overflow-x-auto ">
          {formatPrice(row.getValue("price")?.base_price || 0)}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity_in_stock",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity In Stock
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }: any) => {
      return (
        <div className=" whitespace-nowrap max-w-[150px] overflow-x-auto ">
          {row.getValue("quantity_in_stock")} QTY
        </div>
      );
    },
  },
  {
    accessorKey: "is_live",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product status
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      );
    },
    cell: ({ row }: any) => {
      return (
        <div
          className={cn(
            !row.getValue("is_live")
              ? "border-[#f35f31] text-[#f35f31]"
              : "border-green-700 text-green-700",
            " rounded-sm whitespace-nowrap max-w-[150px] border overflow-x-auto font-bold w-fit px-1"
          )}
        >
          {row.getValue("is_live") ? "Live" : "Not live"}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
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
        <div className="text-right font-medium lowercase max-w-[150px] overflow-x-auto whitespace-nowrap">
          {formatDate(createdAt)}
        </div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <Button
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
        <div className="text-right font-medium lowercase max-w-[150px] overflow-x-auto whitespace-nowrap">
          {formatDate(updatedAt)}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: ({ column }) => {
      return <div className="">actions</div>;
    },
    cell: ({ row }: any) => {
      function ProductIdLink() {
        const { store_id } = useParams();
        return (
          <Link
            href={
              "/store/" +
              store_id +
              "/dashboard/products-settings/" +
              row.getValue("_id") +
              "/update-product"
            }
            className={cn(
              buttonVariants({
                variant: "blue",
                className:
                  "w-fit text-[13px] h-[28px] px-4  max-w-[150px] overflow-x-auto  ",
              })
            )}
          >
            Fix
          </Link>
        );
      }
      return <ProductIdLink />;
    },
  },
];
