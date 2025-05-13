import React from "react";
import FreeContentCard from "./FreeContentCard";
export default function FreeContentSection() {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-black/100">
      <FreeContentCard imageUrl="./2.jpg" title="FREE RENT 3 DAYS" />
      <FreeContentCard imageUrl="./1.jpg" title="FREE MOVIES" />
      <FreeContentCard imageUrl="./3.jpg" title="FREE UP TO 5 EPISODES" />
    </div>
  );
}
