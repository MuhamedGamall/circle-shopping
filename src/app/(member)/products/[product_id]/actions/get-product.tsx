let loading = false;

const getProduct = async ({
  product_id,
}: {
  product_id: string;
}): Promise<{ data: any; loading: boolean }> => {
  if (!product_id) return { data: [], loading: false };

  loading = true;
  try {
    const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/products/${product_id}`;

    const response = await fetch(url, {
      cache: "force-cache",
    });

    const data = await response.json();

    return { data, loading: false };
  } catch (error) {
    console.log("[ERROR:getProduct]", error);
    return { data: [], loading: false };
  } finally {
    loading = false;
  }
};

export default getProduct;
