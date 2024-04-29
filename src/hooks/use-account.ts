import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { getAccount } from "@/lib/RTK/slices/member/account-slice";
import { useSession } from "next-auth/react";

export default function useAccount() {
  const dispatch = useAppDispatch();
  const { account, error } = useAppSelector((state) => state.member_accountData);
  const { status } = useSession();
  const loading = status === "loading";
  useEffect(() => {
    dispatch(getAccount());
  }, [dispatch]);

  return { loading, data: account, error };
}
