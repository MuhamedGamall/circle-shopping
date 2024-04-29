import { getCategories_member } from "@/lib/RTK/slices/member/categories-slice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux";

export default function useMemberCategories() {
  const dispatch = useAppDispatch();
  const { categories, loading, error } = useAppSelector(
    (state) => state.member_categories
  );

  useEffect(() => {
    dispatch(getCategories_member());
  }, [dispatch]);

  return { loading, data: categories, error };
}
