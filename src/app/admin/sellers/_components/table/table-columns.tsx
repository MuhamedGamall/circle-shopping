import { ColumnDef } from "@tanstack/react-table";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import HandleBanBtn from "./handle-ban-button";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "display_name",
    header: ({ column }) => {
      return <div className="uppercase">display name</div>;
    },
    cell: ({ row }: any) => {
      return (
        <span className=" max-w-[150px] overflow-x-auto  text-center   whitespace-nowrap">
          {row.getValue("display_name")}
        </span>
      );
    },
  },
  {
    accessorKey: "personal_email",
    header: ({ column }) => {
      return <div className="uppercase">personal email</div>;
    },
    cell: ({ row }: any) => {
      return (
        <span className="block whitespace-nowrap  text-center  max-w-[150px] overflow-x-auto ">
          {row.getValue("personal_email")}
        </span>
      );
    },
  },
  {
    accessorKey: "business_email",
    header: ({ column }) => {
      return <div className="uppercase">business email</div>;
    },
    cell: ({ row }: any) => {
      return (
        <span className="block whitespace-nowrap  text-center  max-w-[150px] overflow-x-auto ">
          {row.getValue("business_email")}
        </span>
      );
    },
  },
  {
    accessorKey: "finance_email",
    header: ({ column }) => {
      return <div className="uppercase">finance email</div>;
    },
    cell: ({ row }: any) => {
      return (
        <span className="block whitespace-nowrap  text-center  max-w-[150px] overflow-x-auto ">
          {row.getValue("finance_email")}
        </span>
      );
    },
  },
  {
    accessorKey: "store_phone_number",
    header: ({ column }) => {
      return <div className="uppercase">store phone number</div>;
    },
    cell: ({ row }: any) => {
      return (
        <span className="block whitespace-nowrap  text-center  max-w-[150px] overflow-x-auto ">
          {row.getValue("store_phone_number")}
        </span>
      );
    },
  },
  {
    accessorKey: "ban.is_banned",
    header: ({ column }) => {
      return (
        <Button
          className="uppercase"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ban
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: any) => {
      const ban = row?.original?.ban;
      return (
        <HandleBanBtn
          ban={ban}
          seller_id={row.getValue("_id")}
          personal_email={row.getValue("personal_email")}
        />
      );
    },
  },
  {
    accessorKey: "_id",
    header: ({ column }) => {
      return <div className="uppercase">store ID</div>;
    },
    cell: ({ row }) => {
      return (
        <Link
          href={"/admin/sellers/" + row.getValue("_id") + "/details"}
          className=" whitespace-nowrap  text-center  max-w-[150px] overflow-x-auto font-semibold text-[#3866df]"
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
        <Link
          href={"/admin/sellers/" + row.getValue("_id") + "/details"}
          className={cn(
            buttonVariants({
              variant: "blue",
              className: "w-fit text-[13px] h-[28px] px-3",
            })
          )}
        >
          More details
        </Link>
      );
    },
  },
];
