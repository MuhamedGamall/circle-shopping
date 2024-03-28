import { ColumnDef } from "@tanstack/react-table";

import Icons from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDate } from "date-fns";
import { ArrowUpDown, CircleOff, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import HandleAdminBtn from "./handle-admin-button";
import HandleBanBtn from "./handle-ban-button";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "image",
    header: ({ column }) => {
      return <div className="uppercase">Image</div>;
    },
    cell: ({ row }: any) => {
      const image = row.getValue("image");
      return image ? (
        <Image
          src={image}
          alt="image"
          width={200}
          height={200}
          loading="lazy"
          className=" mx-auto  w-[60px]  h-[60px] object-contain aspect-square"
        />
      ) : (
        <div className=" mx-auto w-[60px] h-[60px] bg-[#f7f6fb] flex items-center justify-center text-sm">
          <div className="opacity-[.7]">
            <Icons.logo h="20" w="20" />
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <div className="uppercase">Name</div>;
    },
    cell: ({ row }: any) => {
      return (
        <span className=" max-w-[150px] overflow-x-auto  text-center   whitespace-nowrap">
          {row.getValue("name") || "--"}
        </span>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <div className="uppercase">email</div>;
    },
    cell: ({ row }: any) => {
      return (
        <Link
          href={"/admin/users/" + row.getValue("email") + "/details"}
          className=" whitespace-nowrap  text-center  max-w-[150px] overflow-x-auto font-semibold text-[#3866df]"
        >
          {row.getValue("email")}
        </Link>
      );
    },
  },
  {
    accessorKey: "admin",
    header: ({ column }) => {
      return <div className="uppercase">admin</div>;
    },
    cell: ({ row }: any) => {
      const admin = row.getValue("admin");
      return <HandleAdminBtn admin={admin} email={row.getValue("email")} />;
    },
  },
  {
    accessorKey: "ban",
    header: ({ column }) => {
      return <div className="uppercase">ban</div>;
    },
    cell: ({ row }: any) => {
      const ban = row?.original?.ban;

      return <HandleBanBtn ban={ban} email={row.getValue("email")} />;
    },
  },
  {
    accessorKey: "_id",
    header: ({ column }) => {
      return <div className="uppercase">user ID</div>;
    },
    cell: ({ row }) => {
      return (
        <span className="block whitespace-nowrap  text-center  max-w-[150px] overflow-x-auto ">
          {row.getValue("_id")}
        </span>
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
            href={"/admin/users/" + row.getValue("email") + "/details"}
            className={cn(
              buttonVariants({
                variant: "blue",
                className: "w-fit text-[13px] h-[28px] px-4",
              })
            )}
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>
      );
    },
  },
];
