import React from "react";
import SeriesCard from "./SeriesCard";

export default function SeriesList({ series }) {
  return (
    <div className="series-list">
      {series.length === 0 ? (
        <p>No series found</p>
      ) : (
        series.map((seriesItem) => <SeriesCard key={seriesItem.id} series={seriesItem} />)
      )}
    </div>
  );
}