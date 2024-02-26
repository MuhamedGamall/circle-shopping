"use server";
import axios from "axios";

export default async function getProducts(store_id: string) {
  const products = (await axios.get("/api/store/" + store_id + "/products")).data

  return products;
}
