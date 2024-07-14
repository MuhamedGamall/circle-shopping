"use client";

import Loader from "@/components/loader";
import MaxWidthWrapper from "@/components/wrappers/max-width-wrapper";
import { Product } from "@/types";
import { formatNumber, formatPrice } from "@/utils/format";
import { AiOutlineLike } from "react-icons/ai";
import { FaTruckMoving } from "react-icons/fa";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import ButtonsActions from "./buttons-actions";
import ProductImagesSection from "./product-images-section";
import ProductOverview from "./product-overview";
import ShippingInfos from "./shipping-infos-section";
import TitleAndBages from "./title-and-bages-section";

export default function MobileProductContent({
  product,
  loading,
}: {
  product: Product | null;
  loading: boolean;
}) {
  const discountPercentage = product?.price?.offer?.discount_percentage;
  console.log( ' product mobile',product);
  
  // const { product_id } = useParams();
  // const dispatch = useAppDispatch();

  // const { product, loading } = useAppSelector((state) => state.member_products);

  // useEffect(() => {
  //   if (product_id) {
  //     dispatch(getProduct_member(product_id));
  //   }
  // }, [dispatch, product_id]);

  return (
    <MaxWidthWrapper>
      {loading && <Loader />}
      <div className="w-full  bg-white shadow-section p-8 flex flex-col gap-3">
        <TitleAndBages {...product} />
        <div className="relative">
          <div className="w-[80%] mx-auto">
            <ProductImagesSection images={product?.images} />
          </div>
          <div className="flex items-center gap-1 absolute bottom-2 right-2 z-20 bg-white rounded-[30px] px-2 py-1 shadow-md">
            <AiOutlineLike className="text-[#0084fd] h-4 w-4" />(
            {formatNumber(product?.likes || 0)} )
          </div>
        </div>
        <div className=" text-sm font-semibold ">
          <span className=" font-bold text-[23px]  mb-3 block">
            {formatPrice(product?.price?.offer?.final_price || 0)}
          </span>
          {discountPercentage && (
            <div className="flex items-center gap-2 ">
              <span className=" text-slate-500 line-through">
                {formatPrice(product?.price?.base_price || 0)}
              </span>
              <span className="font-semibold text-[11px]  py-0 leading-4 text-[#37ae02] bg-[#dff1d9] px-1 border flex justify-center items-center">
                {discountPercentage}% off
              </span>
            </div>
          )}
        </div>
        <div
          className="flex items-center gap-2  w-full "
          style={{
            backgroundImage:
              "linear-gradient(91deg, rgba(253, 241, 114, 0.45) 1.08%, rgba(253, 241, 114, 0.2) 50.57%, rgba(253, 241, 114, 0) 96.9%)",
          }}
        >
          {discountPercentage && (
            <div
              className="bg-main  opacity-[.8] pr-4 pl-1 py-1 capitalize text-[#493202] font-bold text-[12px]"
              style={{
                clipPath: "polygon(0px 0px, 100% 0px, 85% 100%, 0% 100%)",
              }}
            >
              {product?.price?.offer?.deal_type}
            </div>
          )}
          {product?.delivery === "free" && (
            <div className="flex gap-1  items-center px-1">
              <FaTruckMoving className="h-3 w-3 text-[#3568db]" />
              <span className="text-[12px] font-semibold tex-shade">
                Free Delivrey
              </span>
            </div>
          )}
        </div>
        <ButtonsActions
          sizes={product?.sizes || []}
          quantity_in_stock={product?.quantity_in_stock || 0}
          max_purchase_quantity={product?.max_purchase_quantity || 1}
        />
        <div>
          <ShippingInfos store_name={product?.store_name || ""} />

          <div className="flex  gap-2 py-3">
            <div className="text-blue bg-slate-100 p-2 rounded-full h-fit w-fit">
              <VscWorkspaceTrusted className="min-h-5 min-w-5" />
            </div>
            <div className=" capitalize">
              <div className="text-sm ">warranty</div>
              <div className="text-[12px] text-slate-500">
                {product?.warranty}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProductOverview {...product} />
    </MaxWidthWrapper>
  );
}
