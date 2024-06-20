import { cn } from "@/lib/utils";

export const SliderBalls = ({ imagesLength, imageIndex }: any) => {
  return (
    <div
      className={cn(
        "  flex gap-1 items-center justify-center h-[15px] whitespace-nowrap py-1 bg-slate-100  "
      )}
    >
      {imagesLength > 1 &&
        Array.from({ length: imagesLength }).map((_, i) => (
          <span
            key={i}
            className={cn("rounded-full w-2 h-2 border bg-white", {
              "bg-slate-500": i === imageIndex,
            })}
          />
        ))}
    </div>
  );
};
