import SectionTitle from "@/components/section-title";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import  { useState } from "react";

export default function ProductOverview({
  model_height,
  model_name,
  model_number,
  colour,
  box_details,
  warranty,
  description,
  highlights,
  category,
  shipping,
  item_pack_quantity,
}: Product|any) {
  const [active,setActive]=useState('overview')
  const tableData = [
    { label: `What's in the Box`, value: box_details },
    { label: "Colour", value: colour },
    { label: "Brand Compatibility", value: category?.brand },
    {
      label: "Product Length",
      value:
        shipping?.shipping_length &&
        `${shipping?.shipping_length?.size} ${shipping?.shipping_length?.size_type}`,
    },
    {
      label: "Product Height",
      value:
        shipping?.shipping_height &&
        `${shipping?.shipping_height?.size} ${shipping?.shipping_height?.size_type}`,
    },
    {
      label: "Product Width/Depth",
      value:
        shipping?.shipping_width_depth &&
        `${shipping?.shipping_width_depth?.size} ${shipping?.shipping_width_depth?.size_type}`,
    },
    {
      label: "Product Weight",
      value:
        shipping?.shipping_weight &&
        `${shipping?.shipping_weight?.size} ${shipping?.shipping_weight?.size_type}`,
    },
    { label: "Item Qty", value: item_pack_quantity },
    { label: "Model Name", value: model_name },
    { label: "Model Number", value: model_number },
    { label: "Model Height", value: model_height },
    { label: "Warranty", value: warranty },
  ].filter((item) => item.value); 
const handleActive=(value:string)=>{
  setActive(value)
}
  return (
    <section className=" p-7 bg-white shadow-section w-full my-7">
      <SectionTitle title="Ovreview" className="my-3 pb-3 border-b md:block hidden w-full" />

      <div className="md:hidden flex items-center font-semibold justify-around text-slate-400 my-3 border-b w-full transition-all">
        <button className={cn("py-3 w-full transition-all",{'text-blue border-b-blue border-b-2 ':active==='overview'})} onClick={()=>handleActive('overview')}>Overview</button>
        <button className={cn("py-3 w-full transition-all",{'text-blue border-b-blue border-b-2 ':active==='specification'})} onClick={()=>handleActive('specification')}>Specifications</button>
      </div>
      <div
        className={cn("md:grid md:grid-cols-1 flex  flex-col-reverse gap-9 ", {
          "md:grid-cols-2": highlights?.length > 0 || description,
        })}
      >
        <div className={cn("md:flex hidden  flex-col gap-5 max-w-[800px]",{'flex':active==='overview'})}>
        
          {highlights?.length > 0 && (
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold ">Highlights</h3>
              <ul className="text-slate-500 list-disc">
                {highlights?.map((el: string, i: number) => (
                  <li key={i} className="ml-5">
                    {el}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {description && (
            <div className="flex flex-col gap-3 ">
              <h3 className="font-semibold ">Overview</h3>
              <p className="text-justify text-slate-500">{description}</p>
            </div>
          )}
        </div>
  
        {tableData.length > 0 && (
          <div className={cn("hidden md:block",{'block':active==='specification'})}>
            <caption className="font-semibold mb-3">Specifications</caption>
            <table className="w-full capitalize">
              <tbody className="specifications-table-body">
                {tableData.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-[#f0f4fd]" : ""}
                  >
                    <td>{item.label}</td>
                    <td>{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
