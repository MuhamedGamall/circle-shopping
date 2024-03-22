
import { Product } from "@/types";
import axios from "axios";
const resetOffer = async ({
  data,
  form,
  store_id,
  product_id,
}: {
  data: Product | null;
  form: any;
  store_id: string | string[];
  product_id: string | string[];
}) => {
  if (!data?.price?.offer?.end_date) return;
  const dateNow = new Date().setHours(0, 0, 0, 0);

  const endDate = new Date(data?.price?.offer?.end_date as Date)?.setHours(
    0,
    0,
    0,
    0
  );
  if (dateNow > endDate) {
    form.reset();
    try {
      await axios.patch(
        "/api/store/" + store_id + "/products/" + product_id + "/reset-offer",
        {
          "price.offer": {
            discount_percentage: 0,
            end_date: "",
            start_date: "",
          },
        }
      );
    } catch (error) {
      console.log("Error reset offer", error);
    }
  }
};
export default resetOffer;
