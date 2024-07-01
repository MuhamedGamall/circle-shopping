"use client";
import { useAppDispatch } from "@/hooks/redux";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useRef, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useLocalStorage, useLocation } from "react-use";
import LoaderLayout from "../loader-layout";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { getProducts_member } from "@/lib/RTK/slices/member/products-slice";
import Loader from "../loader";

export default function SearchBar() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [recentSearch, setRecentSearch] = useLocalStorage(
    "recent-search",
    []
  ) as any;

  const location = useLocation();
  const query = new URLSearchParams(location?.search).get("q");
  const navRef = useRef<HTMLDivElement | null>(null) as any;
  const dispatch = useAppDispatch();

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

  const queryParams =
    location?.search &&
    qs.parse(location?.search, {
      arrayFormat: "comma",
      parseNumbers: true,
    });

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (!term.trim()) return;
    const url = qs.stringifyUrl(
      {
        url: "/search?role=all_products",
        query: { q: term.trim() },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);

    if (loading) return;

    setLoading(true);
    if (recentSearch?.length === 10) {
      recentSearch.pop();
    }
    recentSearch.unshift(term.trim());
    setRecentSearch(recentSearch);
    setOpen(false);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    if (queryParams) {
      dispatch(getProducts_member({ ...queryParams, q: term.trim() }));
    }
  };

  useEffect(() => {
    router.refresh();
  }, [router]);

  const searchBySelectValue = (value: string, i: number) => {
    const url = qs.stringifyUrl(
      {
        url: "/search?role=all_products",
        query: { q: value },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
    if (loading) return;

    setLoading(true);
    setTerm(value);
    recentSearch.splice(i, 1);
    recentSearch.unshift(value);
    setRecentSearch(recentSearch);
    setOpen(false);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
    if (queryParams) {
      dispatch(getProducts_member({ ...queryParams, q: value.trim() }));
    }
  };

  const handleDeleteOne = (i: number) => {
    const newRecentSearch = [...recentSearch];
    newRecentSearch.splice(i, 1);
    setRecentSearch(newRecentSearch);
  };
  return (
    <>
      {loading && <Loader />}
      <div className="relative w-full" ref={navRef}>
        <form onSubmit={handleSearch} className="relative">
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
            className="absolute sm:right-[5%] right-0 sm:border-0 border-l top-[50%] -translate-y-[50%] sm:bg-transparent   bg-blue h-full w-[40px] rounded-r "
          >
            <LuSearch className="h-5 w-5 text-white sm:text-slate-400 m-2" />
          </button>
        </form>
        {open && (
          <div className="absolute bg-white z-50 h-fit   w-full top-12    shadow-section rounded-md">
            <LoaderLayout loading={loading} />
            <div className="flex justify-between p-3">
              <div className="font-bold text-[16px]">Recent Seraches</div>{" "}
              <button
                className={cn("hover:underline text-blue text-sm", {
                  hidden: !recentSearch?.length,
                })}
                onClick={() => setRecentSearch([])}
              >
                Clear all
              </button>
            </div>
            {recentSearch?.length > 0 ? (
              recentSearch?.map((el: string, i: number) => (
                <div
                  key={i}
                  className="flex justify-between items-center cursor-pointer hover:bg-slate-100 pl-5 h-[37px]"
                >
                  <div
                    onClick={() => searchBySelectValue(el, i)}
                    className="text-[13px] text-shade font-semibold flex items-center w-full"
                  >
                    {el}
                  </div>
                  <Button
                    variant={"ghost"}
                    className="h-full"
                    onClick={() => handleDeleteOne(i)}
                  >
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
    </>
  );
}
