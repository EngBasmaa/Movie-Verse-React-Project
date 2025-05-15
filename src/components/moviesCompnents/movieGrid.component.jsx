import React from "react";
import { MovieCard } from "../../shared/components/MovieCard.jsx";

export function MovieGrid({ movies, isSeries }) {
  return (
    <main className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((item, i) => (
        <MovieCard
          key={i}
          imageUrl={item.poster_url || item.poster_path}
          title={isSeries ? item.name : item.title}
          rating={item.vote_average}
          releaseDate={isSeries ? item.release_date : item.release_date}
          showPlayButton={true}
          id={item.id}
          typeOfCard={isSeries ? "tv" : "movie"}
        />
      ))}
    </main>
  );
}
