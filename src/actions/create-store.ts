'use server'
import { Store } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";

export default async function createStore(store: Store) {
  try {
    const data = (await axios.post("/api/store", store)).data;
    console.log(data);

    toast.success("Store created successfully");
    return data;
  } catch (error: any) {
    // toast.error("Uh oh, something went wrong!");
  }
}
