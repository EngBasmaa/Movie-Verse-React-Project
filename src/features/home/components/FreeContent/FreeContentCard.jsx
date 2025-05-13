import React from "react";
import { MovieCard } from "../../../../shared/components/MovieCard";

export default function FreeContentCard({ title, imageUrl }) {
  return (
    <div className="relative w-full h-full group cursor-pointer">
      {/* MovieCard (imageOnly mode) */}
      <MovieCard height={20} imageUrl={imageUrl} imageOnly={true} />

      {/* Strong dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-800/60 to-transparent z-10 rounded-3xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* Centered animated title */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <h2 className="text-white text-xl md:text-2xl lg:text-3xl font-extrabold uppercase text-center drop-shadow-lg px-4 opacity-0 scale-90 transition-all duration-500 group-hover:opacity-100 group-hover:scale-100">
          {title}
        </h2>
      </div>
    </div>
  );
}
