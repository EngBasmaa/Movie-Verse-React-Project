import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { MovieCard } from "../../../../shared/components/MovieCard";
import "swiper/css";
import {
  fetchWatchlistAction,
  removeFromWatchlistAction,
} from "../../../movies/watchlistSlice";
export default function WatchlistPage() {
  const dispatch = useDispatch();

  const { items } = useSelector((state) => state.watchlistSlice);
  useEffect(() => {
    dispatch(fetchWatchlistAction());
  }, [dispatch]);
  const handleRemove = (mediaId) => {
    dispatch(removeFromWatchlistAction(mediaId));
  };
  return (
    <div className="min-h-screen bg-zinc-900 p-8">
      <h1 className="text-3xl font-bold text-white mb-8">My Watchlist</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-400 text-xl">
          Your watchlist is empty
        </p>
      ) : (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            500: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          autoplay={{
            delay: 3000,
            pauseOnMouseEnter: true,
          }}
        >
          {items.map((media) => (
            <SwiperSlide key={media.id}>
              <div className="relative group">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(media.id);
                  }}
                  className="absolute top-2 right-2 z-10 bg-red-600/80 text-white px-3 py-1 rounded-full hover:bg-red-700 transition-all cursor-pointer"
                >
                  ✕ Remove
                </button>
                <div
                  className="pointer-events-none"
                  style={{ position: "relative", zIndex: 1 }}
                ></div>
                <MovieCard
                  imageUrl={media.poster_url}
                  title={media.title || media.name}
                  rating={media.vote_average}
                  showPlayButton={true}
                  releaseDate={media.release_date || media.first_air_date}
                  typeOfCard={media.type}
                  id={media.id}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
