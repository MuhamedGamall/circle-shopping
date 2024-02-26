"use client";

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button, buttonVariants } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { columns } from "./table-columns";
import useProducts from "@/hooks/use-products";
import SearchInputs from "./search-inputs";
import { ChevronDown } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

export function DataTable() {
  const { store_id } = useParams();
  const { data, loading } = useProducts();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full ">
      <Link
        href={
          "/store/" + store_id + "/dashboard/products-settings/create-product"
        }
        className={cn(
          buttonVariants({
            variant: "blue",
            className: "rounded-sm my-4 gap-2  float-right text-[12px] px-7",
          })
        )}
      >
        <FaPlus /> Add New
      </Link>
      <div className="bg-[#eff3fd] p-1  flex items-center justify-between w-full gap-2">
        <SearchInputs dataLength={data?.length} table={table} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="mx-2">
            <Button
              type="button"
              variant="outline"
              className=" px-3 py-2 rounded-sm"
              size={"sm"}
            >
              Categories
              <ChevronDown className="ml-2 h-4 w-4  " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="rounded-none">
            <DropdownMenuItem className="capitalize">
              All categories
            </DropdownMenuItem>
            <DropdownMenuItem className="capitalize">
              category 1
            </DropdownMenuItem>
            <DropdownMenuItem className="capitalize">
              category 2
            </DropdownMenuItem>
            <DropdownMenuItem className="capitalize">
              category 3
            </DropdownMenuItem>
            <DropdownMenuItem className="capitalize">
              category 4
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <>
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-center uppercase text-[#888888] whitespace-nowrap text-[11px]"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            </>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, i) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-center text-[12px] ">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                className="h-24 text-center"
              >
                {loading ? "Loading..." : "No results."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
