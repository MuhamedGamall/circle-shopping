"use client";
import useStoreSeller from "@/hooks/seller/use-store_seller";
import Link from "next/link";

export default function ErrorStoreBanned() {
  const { error }: any = useStoreSeller();

  return (
    <section className=" px-6 py-12 w-full h-screen flex items-center justify-center ">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-blue-500 dark:text-blue-400">
          403 error
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
          Forbidden
        </h1>
        <span>
          This store has been blocked because:
          <p className=" text-gray-500 ">{error?.response?.data}</p>
        </span>
        <Link
          href={"/"}
          className=" w-fit mt-2  px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-md  hover:bg-blue-600 "
        >
          Take me home
        </Link>
      </div>
    </section>
  );
}
