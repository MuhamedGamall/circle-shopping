"use client";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { FormEvent, useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useLocalStorage, useLocation } from "react-use";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { cn } from "@/lib/utils";

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [recentSearch, setRecentSearch] = useLocalStorage(
    "recent-search",
    []
  ) as any;

  const location = useLocation();
  const query = new URLSearchParams(location?.search).get("q");
  const navRef = useRef<HTMLDivElement | null>(null) as any;

  useOnClickOutside(navRef, () => setOpen(false));

  useEffect(() => {
    if (query) {
      setTerm(query);
    }
  }, [query, setRecentSearch]);

  const handleChange = (recentSearch: string) => {
    setTerm(
      recentSearch
        ?.split("")
        ?.map((el) => (el === "=" ? "" : el))
        ?.join("")
    );
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!recentSearch?.includes(term.trim())) {
      console.log(query, term.trim());

      const url = qs.stringifyUrl(
        {
          url: "/search",
          query: { q: term.trim() },
        },
        { skipEmptyString: true, skipNull: true }
      );
      if (term.trim()) {
        router.push(url);
        if (recentSearch?.length === 10) {
          recentSearch.pop(9);
        }
        recentSearch.unshift(term.trim());
        setRecentSearch(recentSearch);
      }
    }
  };
  const handleDeleteOne = (i: number) => {
    const newRecentSearch = [...recentSearch];
    newRecentSearch.splice(i, 1);
    setRecentSearch(newRecentSearch);
  };
  return (
    <div className="relative w-full" ref={navRef}>
      <form onSubmit={onSubmit} className="relative">
        <Input
          onFocus={() => setOpen(true)}
          onChange={(e) => handleChange(e?.target?.value)}
          value={term}
          type="text"
          placeholder="What are you looking for?"
          className="h-[38px] sm:w-[90%] mx-auto  "
        />
        <button
          disabled={!term?.trim()}
          className="absolute sm:right-7 right-0 sm:border-0 border-l top-[50%] -translate-y-[50%] sm:bg-transparent   bg-blue h-full w-[40px] rounded-r "
        >
          <LuSearch className="h-5 w-5 text-white sm:text-slate-400 m-2" />
        </button>
      </form>
      {open && (
        <div className="absolute bg-white z-50 h-fit   w-full top-12   p-3 shadow-section rounded-md">
          <div className="flex justify-between">
            <div className="font-bold text-[16px]">Recent Seraches</div>{" "}
            <button
              className={cn("hover:underline text-blue text-sm",{hidden:!recentSearch?.length})}
              onClick={() => setRecentSearch([])}
            >
              Clear all
            </button>
          </div>
          {recentSearch?.length > 0 ? (
            recentSearch?.map((el: string, i: number) => (
              <div
                key={i}
                className="flex justify-between items-center "
              >
                <div className="text-[13px] text-shade font-semibold">{el}</div>
                <Button variant={"ghost"} onClick={() => handleDeleteOne(i)}>
                  <X className="h-4 w-4 " />
                </Button>
              </div>
            ))
          ) : (
            <div className="text-shade text-[14px] text-center my-10">
              No Searches Yet
            </div>
          )}
        </div>
      )}
    </div>
  );
}
// ?
