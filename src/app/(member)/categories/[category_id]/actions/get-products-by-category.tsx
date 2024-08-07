
let loading = false;

const getProductsByCategory = async ({
  category_id,
}: {
  category_id: string;
}): Promise<{ data: any; loading: boolean; }> => {
  if (!category_id) return { data: [], loading: false };

  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/categories/${encodeURIComponent(category_id)}/subcategory-products`;

  loading = true;

  try {
    const response = await fetch(url,{cache: 'force-cache'});
    const data = await response.json();
    
    return { data, loading: false };
  } catch (error) {
    console.log("[ERROR:getProductsByCategory]", error);
    return { data: [], loading: false };
  } finally {
    loading = false;
  }
};

export default getProductsByCategory;
