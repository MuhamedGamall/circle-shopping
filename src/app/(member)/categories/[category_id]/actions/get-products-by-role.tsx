let loading = false;

const getProductsByRole = async (
  params: any
): Promise<{ data: any; loading: boolean }> => {
  const newParams = new URLSearchParams(params);
  const url = `${
    process.env.NEXT_PUBLIC_APP_URL
  }/api/products?${newParams.toString()}`;

  try {
    loading = true;

    const response = await fetch(url, { cache: "force-cache" });
    const data = await response.json();

    return { data, loading: false };
  } catch (error) {
    console.log("[ERROR:getProductsByRole]", error);
    return { data: [], loading: false };
  } finally {
    loading = false;
  }
};

export default getProductsByRole;
