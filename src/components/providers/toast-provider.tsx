"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      toastOptions={{
        style: {
          padding: "10px",
          fontSize: "16px",
          borderRadius: "0",
        },
        position: "top-right",
        duration: 2100,
      }}
      containerStyle={{
        top: 0,
        left: -20,
      }}
    />
  );
}
