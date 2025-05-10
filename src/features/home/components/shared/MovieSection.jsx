/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useSelector } from "react-redux";
import { MovieCard } from "../../../../shared/components/MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ModernArrow from "./ModernArrow";

export function MovieSection({ title, getMovies, limit = 10 }) {
  const { movies } = useSelector((store) => store.movieSlice);
  const [sectionMovies, setSectionMovies] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    if (movies && movies.length > 0) {
      const fetchedMovies = getMovies(movies, limit);
      setSectionMovies(fetchedMovies);
    }
  }, [movies, getMovies, limit]);

  const swiperParams = {
    modules: [Autoplay, Navigation],
    spaceBetween: 20,
    slidesPerView: 1,
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
      1280: {
        slidesPerView: 5,
      },
    },
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      prevEl: ".custom-swiper-button-prev",
      nextEl: ".custom-swiper-button-next",
    },
    className: "rounded-lg overflow-hidden",
  };

  const arrowStyle = {
    top: "0.5rem",
    transform: "translateY(0)",
  };

  return (
    <div className="bg-black/100 py-12" ref={containerRef}>
      <div className="container mx-auto px-4 relative">
        <div className="flex  items-center justify-between mb-8">
          <h2
            className="text-white text-3xl font-bold  text-left relative pl-6 z-10"
            style={{
              "::before": {
                content: '""',
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: "4px",
                height: "1.5em",
                backgroundColor: "red",
              },
            }}
          >
            {title}
          </h2>
          <div className="flex  top-0  ">
            <div className="custom-swiper-button-prev mr-2">
              <ModernArrow icon={ChevronLeft} style={arrowStyle} />
            </div>
            <div className="custom-swiper-button-next">
              <ModernArrow icon={ChevronRight} style={arrowStyle} />
            </div>
          </div>
        </div>
        <Swiper {...swiperParams}>
          {sectionMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard
                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                title={movie.title}
                rating={movie.vote_average}
                releaseDate={movie.release_date}
                showPlayButton={true}
                overlayVariant="default"
              ></MovieCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
