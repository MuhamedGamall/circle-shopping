import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { getCategories } from "@/lib/RTK/slices/categories-slice";

export default function useCategories() {
  const dispatch = useAppDispatch();
  const { categories, loading } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return { loading, data: categories };
}
