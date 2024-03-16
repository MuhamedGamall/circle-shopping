import { Product } from "@/types";
import axios from "axios";

export async function getProducts(): Promise<Product[] | []> {
  try {
    const data = (await axios.get("/api/admin/products")).data;
    return data;
  } catch (error) {
    console.log("Error getting products: ", error);
    return [];
  }
}
