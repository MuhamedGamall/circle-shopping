import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

export function LoadingSkeleton({
  tableColsLength,
}: {
  tableColsLength: number;
}) {
  const loadingArray = Array.from({ length: 5 }).map((el) => el);
  const tableColsArray = Array.from({ length: tableColsLength }).map(
    (el) => el
  );

  return loadingArray.map((el, i) => (
    <TableRow key={i}>
      {tableColsArray.map((xl, j) => (
        <TableCell key={j}>
          <Skeleton className="h-[20px] w-[150px] rounded-sm" />
        </TableCell>
      ))}
    </TableRow>
  ));
}
