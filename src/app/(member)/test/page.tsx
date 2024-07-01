"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import qs from "query-string";

export default function TestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParam = () => {
    console.log("searchParam", searchParams.toString());
    
    const url = qs.stringifyUrl(
      {
        url: location?.href,
        query: {q: 'lol'},
      },
      { skipEmptyString: true, skipNull: true, arrayFormat: "comma" }
    );

    router.push(url);
  };
  const handleSearchPrams = qs.parse(searchParams.toString(), {
    arrayFormat: "comma",
    parseNumbers: true,
  });
 console.log(handleSearchPrams);
 
  return (
    <div>
      <h1>Test Page</h1>
      <button onClick={updateSearchParam}>Set Search Param</button>
    </div>
  );
}
