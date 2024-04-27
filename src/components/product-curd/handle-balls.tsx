import { cn } from "@/lib/utils";

export const SliderBalls = ({ imagesLength, imageIndex }: any) => {
  return (
    <div
      className={cn(
        "  flex gap-1 items-center justify-center h-[22px] whitespace-nowrap py-2 bg-slate-100  ",
        { hidden: imagesLength == 1 }
      )}
    >
      {Array.from({ length: imagesLength }).map((_, i) => (
        <span
          key={i}
          className={cn("rounded-full w-2 h-2 border bg-white", {
            "bg-slate-300": i === imageIndex,
          })}
        />
      ))}
    </div>
  );
};
