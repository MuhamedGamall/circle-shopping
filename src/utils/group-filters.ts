import { Category } from "@/models/category";
import { Product } from "@/models/product";
import { Store } from "@/models/store";
import { GroupFilters } from "@/types";
import mongoConnect from "@/utils/mongo-connect";

export async function groupFilters({
  filter,
}: any): Promise<GroupFilters | undefined> {
  try {
    await mongoConnect();
    const filterCategories = {
      "main_category.name": filter?.["category.main_category"],
    };

    const category = await Category.findOne(filterCategories);

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
      { $sort: { count: -1 } },
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
      { $sort: { count: -1 } },
    ]);

    filterBySellers = await Promise.all(
      filterBySellers.map(async (el) => {
        const store: any = await Store.findById(el._id).lean();
        return {
          ...el,
          _id: store ? store?.display_name : null,
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
      { $sort: { count: -1 } },
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
      { $sort: { count: -1 } },
    ]);

    const filterByDeals = await Product.aggregate([
      { $match: filter },
      {
        $group: {
          _id: "$price.offer.deal_type",
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          _id: { $ne: null },
        },
      },

      { $sort: { count: -1 } },
    ]);

    // const mostLikes = await Product.findOne(filter)
    //   .sort({ likes: -1 })
    //   .select("likes");
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
    const defaultValues = 9e10;

    const groupFilters = {
      // maximumLikes: mostLikes?.likes || defaultValues,
      category,
      maximumPrice: filterByPrice[0]?.maxPrice || defaultValues,
      minimumPrice: filterByPrice[0]?.minPrice || 0,
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
