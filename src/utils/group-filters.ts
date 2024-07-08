import { Category } from "@/models/category";
import { Product } from "@/models/product";
import { Store } from "@/models/store";
import { GroupFilters } from "@/types";
import mongoConnect from "@/utils/mongo-connect";

async function getFilteredProducts(filter: any, groupByField: string) {
  return Product.aggregate([
    { $match: filter },
    {
      $group: {
        _id: `$${groupByField}`,
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);
}

export async function groupFilters({
  filter,
}: any): Promise<GroupFilters | undefined> {
  try {
    await mongoConnect();
    const findCategory = {
      ...(filter?.["category.main_category"] && {
        "main_category.name": filter?.["category.main_category"],
      }),
    };

    const categories = await Category.find(findCategory);

    const filterBySellers = await getFilteredProducts(filter, "store_name");

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

    const filterByPrice = await Product.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          maxPrice: { $max: "$price.base_price" },
        },
      },
    ]);

    const defaultValues = 10e10;
    const maxPrice =
      filterByPrice[0]?.minPrice == filterByPrice[0]?.maxPrice
        ? defaultValues
        : filterByPrice[0]?.maxPrice;

    const filterByBrands = await getFilteredProducts(filter, "category.brand");
    const filterByColour = await getFilteredProducts(filter, "colour");
    const filterByCondition = await getFilteredProducts(
      filter,
      "item_condition"
    );

    const groupFilters = {
      categories,
      maxPrice,
      minPrice: filterByPrice[0]?.minPrice || 0,
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
