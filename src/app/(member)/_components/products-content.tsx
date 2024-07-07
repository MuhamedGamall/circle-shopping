"use client";

import FilterSidebar from "@/app/(member)/_components/filter-sidebar";
import ProductsTopbar from "@/app/(member)/_components/products-topbar";
import FiltersSheetTrigger from "@/app/(member)/_components/sheet-trigger";
import Loader from "@/components/loader";
import MobileProductCard from "@/components/product-curd/mobile-product-curd";
import ProductCard from "@/components/product-curd/product-card";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import {
  cleanUp,
  getProducts_member,
} from "@/lib/RTK/slices/member/products-slice";
import { useParams, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { IoListOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { useWindowSize } from "react-use";
export default function ProductsContent() {
  const { category_id, sub_category_id } = useParams() as any;
  const searchParamshook = useSearchParams();
  const [isGrid, setIsGrid] = useState(true);
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const isSmallScreen = width <= 420;

  const [searchParams, setSearchParams] = useState<any>(null);
  const { products, loading } = useAppSelector(
    (state) => state.member_products
  );

  const searchQuery = searchParamshook?.get("q");
  const sortByParam = searchParamshook?.get("sortBy");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryParams = qs.parse(window.location.search, {
        arrayFormat: "comma",
        parseNumbers: true,
      });
      queryParams && setSearchParams(queryParams);
    }
  }, []);

  useEffect(() => {
    const newParams = {
      ...(category_id && {
        mainCategory: category_id?.replaceAll("-", " "),
      }),
      ...(sub_category_id && {
        subCategory: sub_category_id?.replaceAll("-", " "),
      }),
      ...searchParams,
      q: searchQuery,
      sortBy: sortByParam,
    };
    if (searchParams) {
      dispatch(getProducts_member(newParams));
    }

    return () => {
      dispatch(cleanUp());
    };
  }, [
    category_id,
    dispatch,
    sub_category_id,
    searchParams,
    sortByParam,
    searchQuery,
  ]);

  return (
    <div className="flex gap-5 bg-[#f7f7fa] ">
      {loading && <Loader />}
      <div className="md:block hidden">
        <FilterSidebar
          groupFilters={products?.groupFilters}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>

      <FiltersSheetTrigger
        groupFilters={products?.groupFilters}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className="w-full ">
        <div className="xxs:block flex items-center justify-between">
          <ProductsTopbar
            resultsLength={products?.products?.length}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <button
            type="button"
            className="xxs:hidden m-5 "
            onClick={() => setIsGrid((curr) => !curr)}
          >
            {isGrid ? (
              <RxDashboard className="h-5 w-5 text-shade" />
            ) : (
              <IoListOutline className="h-5 w-5 text-shade" />
            )}
          </button>
        </div>
        <div className="products-container my-5">
          {products?.products?.map((el, i) =>
            isSmallScreen && isGrid ? (
              <MobileProductCard key={i} {...el} />
            ) : (
              <ProductCard key={i} {...el} />
            )
          )}
        </div>
      </div>
    </div>
  );
}
