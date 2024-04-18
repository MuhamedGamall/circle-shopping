import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { getCategories } from "@/lib/RTK/slices/categories-slice";
import { useDebounce } from "react-use";

export default function useCategories(searchQuery?: string) {
  const dispatch = useAppDispatch();
  const [debouncedValue, setDebouncedValue] = useState("");
  const { categories, loading, error } = useAppSelector(
    (state) => state.categories
  );
  const query = searchQuery ? searchQuery : "";
  useDebounce(
    () => {
      setDebouncedValue(query.trim());
    },
    2000,
    [query.trim()]
  );

  useEffect(() => {
    dispatch(getCategories(debouncedValue.trim()));
  }, [debouncedValue, dispatch]);

  return { loading, data: categories, error };
}
