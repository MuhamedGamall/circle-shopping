import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux";
import { getCategories_admin } from "@/lib/RTK/slices/admin/categories-slice";
import { useDebounce } from "react-use";

export default function useAdminCategories(searchQuery?: string) {
  const dispatch = useAppDispatch();
  const [debouncedValue, setDebouncedValue] = useState("");
  const { categories, loading, error } = useAppSelector(
    (state) => state.admin_categories
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
    dispatch(getCategories_admin(debouncedValue.trim()));
  }, [debouncedValue, dispatch]);

  return { loading, data: categories, error };
}
