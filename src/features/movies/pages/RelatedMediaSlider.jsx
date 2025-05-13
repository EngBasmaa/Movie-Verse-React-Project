import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { MovieCard } from "../../../shared/components/MovieCard";
import "swiper/css";
import "swiper/css/pagination";

export default function RelatedMediaSlider({ relatedMedia, type }) {
  const overlays = ["dark", "pink", "blue", "purple", "orange", "teal", "red"];

  if (!relatedMedia || relatedMedia.length === 0) return null;

  return (
    <div className="mt-12 relative pb-12">
      <h2 className="text-2xl font-bold mb-8 text-white">
        Related {type === "movie" ? "Movies" : "Series"}
      </h2>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          500: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        pagination={{
          clickable: true,
          type: "bullets",
          bulletClass:
            "swiper-bullet bg-red-900 mx-1 w-2 h-2 inline-block rounded-full transition-all duration-300 ease-in-out cursor-pointer",
          bulletActiveClass: "swiper-bullet-active !bg-blue-500 !w-6",
          renderBullet: (index, className) => {
            return `<span class="${className}"></span>`;
          },
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="!pb-10"
      >
        {relatedMedia.map((media, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <MovieCard
                imageUrl={media.poster_url}
                title={media.title || media.name}
                rating={media.vote_average}
                releaseDate={media.release_date || media.first_air_date}
                showPlayButton={true}
                overlayVariant={
                  overlays[Math.floor(Math.random() * overlays.length)]
                }
                className="hover:scale-105 transition-transform duration-300"
                typeOfCard={type}
                id={media.id}
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
