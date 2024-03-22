import { buttonVariants } from "@/components/ui/button";
import useStore from "@/hooks/seller/use-store_seller";
import { cn } from "@/lib/utils";
import { truncateText } from "@/utils/truncate-text";
import Link from "next/link";
export default function StoreButton() {
  const { data } = useStore();
  const name = data?.display_name;
  return (
    <div className="md:block  hidden">
      {data && (
        <Link
          href={"/store/" + data?._id + "/store-settings"}
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
