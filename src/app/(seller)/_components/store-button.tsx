import Icons from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useStore from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import { truncateText } from "@/utils/truncate-text";
import Link from "next/link";
const LoadingSkeleton = () => {
  return (
    <div className="sm:flex items-center gap-2 hidden py-1 px-3 border rounded-md w-[110px] ">
      <Skeleton className="h-[35px] px-3 rounded-md" />
      <Skeleton className="py-2 w-full px-3 rounded-md" />
    </div>
  );
};

export default function StoreButton() {
  const { data, loading } = useStore();
  const name = data?.display_name;
  return loading ? (
    <LoadingSkeleton />
  ) : (
    <div className="md:block  hidden">
      {data && (
        <Link
          href={"/store/" + data?._id + "/dashboard/store-settings"}
          className={cn(
            buttonVariants({
              variant: "outline",
              className:
                "py-6 pl-2 pr-8 leading-[inherit] flex items-center gap-2",
            })
          )}
        >
          <span className="h-[35px] px-2.5 text-sky-700 flex items-center font-bold rounded-md bg-slate-100 ">
            {name?.slice(0, 1)}
          </span>
          <span className="font-semibold text-sm block">
            {truncateText(name || "", 10)}
          </span>
        </Link>
      )}
    </div>
  );
}
