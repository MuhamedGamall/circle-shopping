import React from "react";

export default function CategoryPage({
  params: { category },
}: {
  params: { category: string | string[] };
}) {
  let [main_category, sub_category] = Array.isArray(category)
    ? category
    : [category];
  console.log(category);

  return <div>MainCategoryPage</div>;
}
