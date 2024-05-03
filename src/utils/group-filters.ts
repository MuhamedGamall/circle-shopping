import { Product } from "@/models/product";
import { Store } from "@/models/store";
import { GroupFilters } from "@/types";
import mongoConnect from "@/utils/mongo-connect";

export async function groupFilters({
  filter,
}: any): Promise<GroupFilters | undefined> {
  try {
    await mongoConnect();

    const filterByCondition = await Product.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$item_condition",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    let filterBySellers = await Product.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$store_id",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    filterBySellers = await Promise.all(
      filterBySellers.map(async (el) => {
        const store: any = await Store.findById(el._id).lean();
        return {
          ...el,
          _id: store ? store.display_name : null,
        };
      })
    );

    const filterByBrands = await Product.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$category.brand",
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    const filterByColour = await Product.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$colour",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const filterByDeals = await Product.aggregate([
      { $match: filter },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                {
                  case: {
                    $and: [
                      { $gte: ["$price.offer.discount_percentage", 5] },
                      { $lte: ["$price.offer.discount_percentage", 20] },
                    ],
                  },
                  then: "deal",
                },
                {
                  case: {
                    $and: [
                      { $gte: ["$price.offer.discount_percentage", 20] },
                      { $lte: ["$price.offer.discount_percentage", 50] },
                    ],
                  },
                  then: "beg deal sale",
                },
                {
                  case: { $gte: ["$price.offer.discount_percentage", 50] },
                  then: "mega deal",
                },
              ],
              default: "not a deal",
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          _id: { $ne: "not a deal" },
        },
      },
    ]);
    const mostLikes = await Product.findOne(filter)
      .sort({ likes: -1 })
      .select("likes");
    const filterByPrice = await Product.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          minPrice: { $min: "$price.base_price" },
          maxPrice: { $max: "$price.base_price" },
        },
      },
    ]);

    const groupFilters = {
      maximumLikes: mostLikes.likes,
      maximumPrice: filterByPrice[0].maxPrice,
      minimumPrice: filterByPrice[0].minPrice,
      filterByBrands,
      filterByDeals,
      filterBySellers,
      filterByCondition,
      filterByColour,
    };

    return groupFilters;
  } catch (error) {
    console.log("[GROUP_FILTERS]", error);
  }
}
