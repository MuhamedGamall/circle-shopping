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

import { Button } from "@/components/ui/button";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Product } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { LoadingSkeleton } from "./table-loading";
import { Input } from "../ui/input";
import useCategories from "@/hooks/use-categories";
import { CategoriesFilter } from "./categories-filter";

export function ProductsTable({
  data,
  loading,
  columns,
  setSearchQuery,
  searchQuery,
}: {
  data: Product[];
  loading: boolean;
  columns: any[];
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchQuery: string;
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [categorySelected, setCategorySelected] = useState("");
  const [dataFilterd, setDataFilterd] = useState<Product[]>([]);
  const { data: categories, loading: cateLoading } = useCategories("");
  
  const sortingCategories = [...categories].sort((a, b) => {
    const nameA = a?.main_category?.name || "";
    const nameB = b?.main_category?.name || "";
    return nameA.localeCompare(nameB);
  });
  
  useEffect(() => {
    const filterData = categorySelected
      ? data.filter(
          (product) => product?.category?.main_category === categorySelected
        )
      : data;

    setDataFilterd(filterData);
  }, [categorySelected, data]);
  const table = useReactTable({
    data: dataFilterd,
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
      <div className="bg-[#eff3fd] p-1  flex items-center justify-between w-full gap-2">
        <div className="bg-[#eff3fd] p-1  flex items-center justify-between w-full gap-2">
          <Input
            placeholder={`Search`}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            type="text"
            disabled={loading}
            className="border rounded-sm "
          />
        </div>
        <CategoriesFilter
          loading={cateLoading}
          categories={sortingCategories}
          value={categorySelected}
          setValue={setCategorySelected}
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <>
              <TableRow key={headerGroup.id} className="">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-center  text-[#888888] whitespace-nowrap "
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
          ) : loading ? (
            <LoadingSkeleton tableColsLength={columns.length} />
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                className="h-24 text-center"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
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
