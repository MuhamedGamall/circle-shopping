import React from "react";

export default function ImageInstructions() {
  return (
    <div className="bg-[#fafbff] p-3 rounded-sm">
      <h4 className="font-semibold mb-2 text-sm"> Image Instructions</h4>
      <ul className="[&>li]:ml-4 grid grid-cols-1 gap-y-2 gap-x-5 lg:grid-cols-2 list-disc text-sm text-slate-600 ">
        <li>660 x 900 or more recommended</li>
        <li>Image width should be greater than 660px</li>
        <li>Image height should be greater than 900px</li>
        <li>File size should be less than 10MB</li>
        <li>Max files allowed is 10</li>
      </ul>
    </div>
  );
}
