import React from "react";

const Name = ({ textColor }) => {
  return (
    <svg className="w-full text-center text-5xl pt-1 mb-10 text-[color:var(--primary)] font-medium md:text-6xl select-none">
      <text
        y="50%"
        x="50%"
        textAnchor="middle"
        fill="var(--primary)"
        stroke="var(--primary-darkened)"
        strokeWidth={0}
      >
        Paolo Ginefra
      </text>
    </svg>
  );
};

export default Name;
