import SectionTitle from "@/components/section-title";
import { Product } from "@/types";
import React from "react";

export default function ProductOverView({
  model_height,
  model_name,
  model_number,
  colour,
  box_details,
  warranty,
  description,
  highlights,
}: Product |any) {
  return (
    <section className=" p-7 bg-white shadow-section w-full mt-7">
      <SectionTitle title="Ovreview" className="my-3 pb-3 border-b w-full" />
      <div className="flex gap-9 ">
        <div className="flex flex-1 flex-col gap-5 max-w-[800px]">
          {highlights?.length && (
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold ">Highlights</h3>
              <ul className="text-slate-500 list-disc">
                {highlights?.map((el:string, i:number) => (
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
        {(box_details ||
          colour ||
          model_name ||
          model_number ||
          model_height ||
          warranty) && (
          <div className="flex-1 ">
            <caption className="font-semibold mb-3">Specifications</caption>
            <table className="w-full capitalize">
              <tbody className="specifications-table-body ">
                <tr className="bg-[#f0f4fd] p-[7px_15px]">
                  <td>Box Details</td>
                  <td>{box_details}</td>
                </tr>
                <tr>
                  <td>Colour Name</td>
                  <td>{colour}</td>
                </tr>
                <tr className="bg-[#f0f4fd]">
                  <td>Model Name</td>
                  <td>{model_name}</td>
                </tr>
                <tr>
                  <td>Model Number</td>
                  <td>{model_number}</td>
                </tr>
                <tr className="bg-[#f0f4fd]">
                  <td>Model Height</td>
                  <td>{model_height}</td>
                </tr>
                <tr>
                  <td>Warranty</td>
                  <td>{warranty}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
