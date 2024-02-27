"use server";
import axios from "axios";

export default async function getProducts(store_id: string) {
  try {
    const products = (await axios.get("/api/store/" + store_id + "/products"))
      .data;
    return products;
  } catch (error: any) {
    console.log(error);
  }
}
