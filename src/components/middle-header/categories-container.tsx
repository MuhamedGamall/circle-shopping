"use client";
import Link from "next/link";
import CategoryItem from "./category-item";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { MenubarSeparator } from "@radix-ui/react-menubar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const categories: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function CategoriesContainer() {
  const pathname = usePathname();
  console.log(pathname.includes("account"));

  return (
    <nav
      className={cn(
        pathname.includes("account") ? "hidden" : "hidden sm:block",
        "bg-[#fcfbf4] overflow-x-auto py-1"
      )}
    >
      <Menubar className="rounded-none bg-transparent mx-auto border-0  min-w-fit w-full xl:max-w-[1890px]  px-2.5">
        <MenubarMenu>
          <MenubarTrigger>
            <Link href={"/bestsellers"} className="">
              BESTSELLERS
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarSeparator className="h-full w-[2px] bg-slate-200" />
        {categories.map((el) => (
          <CategoryItem key={el.title} {...el} />
        ))}
      </Menubar>
    </nav>
  );
}
