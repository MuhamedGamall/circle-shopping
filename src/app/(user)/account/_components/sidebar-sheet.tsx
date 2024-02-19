import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";

import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SidebarSheet({ className }: { className: string }) {
  return (
    <Sheet>
      <SheetTrigger className={cn("md:hidden ", className)}>
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 w-[300px]">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
