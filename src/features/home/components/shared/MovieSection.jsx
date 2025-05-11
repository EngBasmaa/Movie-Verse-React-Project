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
  navigationId,
  overlayVariant = "default",
}) {
  const swiperRef = useRef(null);
  const { movies } = useSelector((store) => store.movieSlice);
  const [sectionMovies, setSectionMovies] = useState([]);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Re-init navigation on mount or navigationId change
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (swiperRef.current?.swiper?.params?.navigation) {
        swiperRef.current.swiper.navigation.destroy();
        swiperRef.current.swiper.navigation.init();
        swiperRef.current.swiper.navigation.update();
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [navigationId]);

  useEffect(() => {
    if (movies && movies.length > 0) {
      const fetched = getMovies(movies, limit);
      setSectionMovies(fetched);
    }
  }, [movies, getMovies, limit]);

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
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      prevEl: `.${navigationId}-prev`,
      nextEl: `.${navigationId}-next`,
    },
    pagination: { clickable: true },
    observer: true,
    observeParents: true,
    className: "rounded-lg overflow-hidden",
    onSwiper: setSwiperInstance,
  };

  const arrowStyle = {
    top: "0.5rem",
    transform: "translateY(0)",
  };

  const slideNext = () => swiperInstance?.slideNext();
  const slidePrev = () => swiperInstance?.slidePrev();

  return (
    <div className="bg-black py-12">
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white text-3xl font-bold text-left pl-6 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-[1.5em] before:bg-red-600">
            {title}
          </h2>
          <div className="flex">
            <button className={`${navigationId}-prev mr-2`} onClick={slidePrev}>
              <ModernArrow icon={ChevronLeft} style={arrowStyle} />
            </button>
            <button className={`${navigationId}-next`} onClick={slideNext}>
              <ModernArrow icon={ChevronRight} style={arrowStyle} />
            </button>
          </div>
        </div>

        {/* Swiper */}
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
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
