import React from "react";

export default function SectionHeader({ span, h2, p }) {
  return (
    <div className=" flex items-center flex-col text-center">
      <span className=" uppercase font-semibold  tracking-widest text-sm">
        {span}
      </span>
      <h2 className=" text-4xl uppercase font-bold py-3">{h2}</h2>
      <p className="w-2/5">{p}</p>
    </div>
  );
}
