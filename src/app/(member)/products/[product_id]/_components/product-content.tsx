"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  getProduct_member
} from "@/lib/RTK/slices/member/products-slice";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function ProductContent() {
  const { product_id } = useParams();
  const dispatch = useAppDispatch();

  const { product, loading } = useAppSelector((state) => state.member_products);

  useEffect(() => {
    if (product_id) {
      dispatch(getProduct_member(product_id));
    }
  }, [dispatch, product_id]);

  return <div>ProductContent</div>;
}
