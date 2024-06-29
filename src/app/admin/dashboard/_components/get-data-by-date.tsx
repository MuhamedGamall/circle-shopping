"use client";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { getAdminDashboardAnalytics } from "@/lib/RTK/slices/admin/dashboard";
import { useAppDispatch } from "@/hooks/redux";
import LoaderLayout from "@/components/loader-layout";

export function GetDataByDate({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<DateRange | any>({
    from: new Date("2024-1-1"),
    to: addDays(new Date(), 20),
  });

  const [open, setOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const onSubmit = async () => {
    if (!date?.from || !date?.to) return;
    setIsSubmitting(true);
    await dispatch(getAdminDashboardAnalytics(date));
    setIsSubmitting(false);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 flex flex-col " align="end">
          <LoaderLayout loading={isSubmitting} />
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) =>
              setDate((curr: DateRange) => ({
                from: range?.from ? new Date(range?.from) : curr?.from,
                to: range?.to ? new Date(range?.to) : curr?.to,
              }))
            }
            numberOfMonths={2}
            fromYear={2024}
            toDate={new Date()}
          />
          <Button
            variant={"secondary"}
            className="rounded-none w-full"
            onClick={onSubmit}
            disabled={!date?.from || !date?.to || isSubmitting}
          >
            Save
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
