import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { getAccount } from "@/lib/RTK/slices/member/account-slice";
import { useSession } from "next-auth/react";

export default function useAccount() {
  const dispatch = useAppDispatch();
  const { account, error, loading } = useAppSelector(
    (state) => state.member_accountData
  );

  useEffect(() => {
    dispatch(getAccount());
  }, [dispatch]);

  return { loading, data: account, error };
}
