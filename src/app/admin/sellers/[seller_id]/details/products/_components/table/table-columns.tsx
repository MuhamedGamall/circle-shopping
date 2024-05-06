import { ColumnDef } from "@tanstack/react-table";

import Icons from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/utils/format";
import { formatDate } from "date-fns";
import { ArrowUpDown, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UnPublishBtn from "./unpublish-btn";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "images",

    header: ({ column }) => {
      return <div className="uppercase">Image</div>;
    },
    cell: ({ row }: any) => {
      return row.getValue("images")?.[0] ? (
        <Image
          src={row.getValue("images")?.[0]}
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
    accessorKey: "title",
    header: ({ column }) => {
      return <div className="uppercase">Title</div>;
    },
    cell: ({ row }: any) => {
      return (
        <span className=" max-w-[150px] overflow-x-auto  text-center   whitespace-nowrap">
          {row.getValue("title") || "--"}
        </span>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return <div className="uppercase">Category</div>;
    },
    cell: ({ row }: any) => {
      return (
        <span className=" max-w-[150px] overflow-x-auto text-center  whitespace-nowrap">
          {row.getValue("category")?.main_category}
        </span>
      );
    },
  },

  {
    accessorKey: "_id",
    header: ({ column }) => {
      return <div className="uppercase">Product ID</div>;
    },
    cell: ({ row }) => {
      function ProductActions() {
        return (
          <Link
            href={
              "/admin/sellers/" +
              row.original.store_id +
              "/details/products/" +
              row.getValue("_id") +
              "/details"
            }
            className="block whitespace-nowrap  text-center  max-w-[150px] overflow-x-auto font-semibold text-blue"
          >
            {row.getValue("_id")}
          </Link>
        );
      }

      return <ProductActions />;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return <div className=" uppercase">price</div>;
    },
    cell: ({ row }: any) => {
      return (
        <div className=" text-center  whitespace-nowrap max-w-[150px] overflow-x-auto ">
          {formatPrice(row.getValue("price")?.base_price || 0)}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity_in_stock",
    header: ({ column }) => {
      return <div className=" uppercase"> Quantity In Stock</div>;
    },
    cell: ({ row }: any) => {
      return (
        <div className=" text-center  whitespace-nowrap max-w-[150px] overflow-x-auto ">
          {row.getValue("quantity_in_stock")} QTY
        </div>
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
      function ProductActions() {
        return (
          <div className="flex items-center gap-2">
            <Link
              href={
                "/admin/sellers/" +
                row.original.store_id +
                "/details/products/" +
                row.getValue("_id") +
                "/details"
              }
              className={cn(
                buttonVariants({
                  variant: "blue",
                  className: "w-fit text-[13px] h-[28px] px-3",
                })
              )}
            >
              <Eye className="h-4 w-4" />
            </Link>
            <UnPublishBtn
              store_id={row?.original?.store_id}
              store_personal_email={row?.original?.store_personal_email}
              product_id={row.getValue("_id")}
            />
          </div>
        );
      }
      return <ProductActions />;
    },
  },
];
