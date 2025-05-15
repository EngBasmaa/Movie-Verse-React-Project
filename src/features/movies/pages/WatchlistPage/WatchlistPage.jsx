import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { MovieCard } from "../../../../shared/components/MovieCard";
import "swiper/css";
import {
  fetchWatchlistAction,
  removeFromWatchlistAction,
} from "../../../movies/watchlistSlice";

const MySwal = withReactContent(Swal);

export default function WatchlistPage() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.watchlistSlice);

  useEffect(() => {
    dispatch(fetchWatchlistAction());
  }, [dispatch]);

  const handleRemove = async (mediaId) => {
    const result = await MySwal.fire({
      title: <span className="text-xl">Are you sure?</span>,
      html: <p className="text-gray-600">You won't be able to revert this!</p>,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      customClass: {
        popup: "rounded-lg",
        confirmButton: "px-4 py-2 mr-2",
        cancelButton: "px-4 py-2",
      },
    });

    if (result.isConfirmed) {
      try {
        await dispatch(removeFromWatchlistAction(mediaId)).unwrap();

        MySwal.fire({
          title: <span className="text-green-600">Deleted!</span>,
          text: "Item removed from your watchlist.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        MySwal.fire({
          title: <span className="text-red-600">Error!</span>,
          text: "Failed to remove item.",
          icon: "error",
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          My Watchlist
          <span className="ml-2 text-zinc-400 text-lg">({items.length})</span>
        </h1>

        {status === "loading" ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-zinc-400 text-xl mb-4">
              Your watchlist is empty
            </p>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
              onClick={() => window.history.back()}
            >
              Browse Movies
            </button>
          </div>
        ) : (
          <Swiper
            key={items.length} // Force re-render on items change
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
                    className="absolute top-3 right-3 z-10 bg-red-600 text-white px-3 py-1 rounded-3xl text-sm hover:bg-red-700 transition-colors"
                  >
                    Remove
                  </button>
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
    </div>
  );
}
