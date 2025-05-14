import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useSelector } from "react-redux";
import { MovieCard } from "../../../../shared/components/MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ModernArrow from "./ModernArrow";

export function MovieSection({
  title,
  getMovies,
  limit = 10,
  genre,
  navigationId,
  overlayVariant = "default",
  order,
}) {
  const swiperRef = useRef(null);
  const containerRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const { movies } = useSelector((store) => store.movieSlice);
  const [sectionMovies, setSectionMovies] = useState([]);

  useEffect(() => {
    if (movies && movies.length > 0) {
      const fetchedMovies = getMovies(movies, limit, genre, order);
      setSectionMovies(fetchedMovies);
    }
  }, [movies, getMovies, limit, genre, order]);

  useEffect(() => {
    const id = setTimeout(() => {
      if (swiperRef.current?.swiper?.navigation) {
        swiperRef.current.swiper.navigation.destroy();
        swiperRef.current.swiper.navigation.init();
        swiperRef.current.swiper.navigation.update();
      }
    }, 200);

    return () => clearTimeout(id);
  }, [navigationId, sectionMovies]);

  const slideNext = () => swiperInstance?.slideNext();
  const slidePrev = () => swiperInstance?.slidePrev();

  const swiperParams = {
    modules: [Autoplay, Navigation, Pagination],
    spaceBetween: 20,
    slidesPerView: 1,
    breakpoints: {
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
      1280: { slidesPerView: 5 },
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      prevEl: `.${navigationId}-prev`,
      nextEl: `.${navigationId}-next`,
    },

    className: "rounded-lg overflow-hidden",
    onSwiper: setSwiperInstance,
  };

  return (
    <div className="bg-black py-12" ref={containerRef}>
      <div className="container mx-auto px-4 relative ">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white text-3xl font-bold text-left relative pl-6 z-10">
            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-red-600 rounded"></span>
            {title}
          </h2>

          <div className="flex">
            <button className={`${navigationId}-prev mr-2`} onClick={slidePrev}>
              <ModernArrow icon={ChevronLeft} />
            </button>
            <button className={`${navigationId}-next`} onClick={slideNext}>
              <ModernArrow icon={ChevronRight} />
            </button>
          </div>
        </div>

        <Swiper ref={swiperRef} {...swiperParams}>
          {sectionMovies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCard
                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                title={movie.title}
                rating={movie.vote_average}
                releaseDate={movie.release_date}
                showPlayButton={true}
                overlayVariant={overlayVariant}
                typeOfCard="movie"
                id={movie.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
