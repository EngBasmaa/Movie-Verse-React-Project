import React from "react";
import SeriesCard from "./SeriesCard";

export default function SeriesList({ series }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {series.length === 0 ? (
        <p className="text-white text-center col-span-full">No series found</p>
      ) : (
        series.map((seriesItem) => <SeriesCard key={seriesItem.id} series={seriesItem} />)
      )}
    </div>
  );
}