import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Button } from "../../../shared/components/MyButton";
import { MovieCard } from "../../../shared/components/MovieCard";
import { useDispatch } from "react-redux";
import { addToWatchlistAction } from "../watchlistSlice";
import { useSelector } from "react-redux";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 20 },
  },
};

export default function MediaInfo({
  selectedMedia,
  type,
  onReviewClick,
  watchTrailerButton,
}) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.watchlistSlice);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const exists = items.some((item) => item.id === selectedMedia.id);
    setIsInWatchlist(exists);
  }, [items, selectedMedia.id]);

  return (
    <div className="flex flex-col items-center md:flex-row gap-8">
      {/* Poster Section */}
      <motion.div
        variants={itemVariants}
        className="sm:w-2/3 md:w-2/3 lg:w-1/3"
      >
        <motion.div transition={{ type: "spring", stiffness: 300 }}>
          <MovieCard
            imageUrl={selectedMedia?.poster_url}
            imageOnly={true}
            className="group"
          >
            <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 rounded-b-xl">
              <div className="flex items-center justify-center gap-2">
                <span className="text-yellow-400 text-2xl">★</span>
                <span className="text-xl font-bold text-white">
                  {selectedMedia?.vote_average
                    ? selectedMedia.vote_average.toFixed(1)
                    : "N/A"}
                </span>
                <span className="text-gray-400 text-sm">
                  ({selectedMedia?.vote_count || 0})
                </span>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-blue-600 px-3 py-1 rounded-full text-sm flex items-center gap-1 text-white">
              🔥 {Math.round(selectedMedia?.popularity || 0)}
            </div>
          </MovieCard>
        </motion.div>
      </motion.div>

      {/* Details Section */}
      <motion.div variants={containerVariants} className="md:w-2/3 space-y-6">
        {/* Title & Info */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-900 bg-clip-text text-transparent mb-2">
            {selectedMedia?.title || selectedMedia?.name || "No Title"}
          </h1>
          <div className="text-gray-400 space-y-1">
            <p>
              {selectedMedia?.release_date || selectedMedia?.first_air_date
                ? new Date(
                    selectedMedia.release_date || selectedMedia.first_air_date
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Release date not available"}
            </p>
            <p>
              Original Title:{" "}
              {selectedMedia?.original_title ||
                selectedMedia?.original_name ||
                "N/A"}
            </p>
            <p>
              Language:{" "}
              {selectedMedia?.original_language?.toUpperCase() || "N/A"}
            </p>
            {type === "series" && (
              <p>
                Seasons: {selectedMedia?.number_of_seasons || "N/A"}, Episodes:{" "}
                {selectedMedia?.number_of_episodes || "N/A"}
              </p>
            )}
          </div>
        </motion.div>

        {/* Genres */}
        <motion.div
          variants={containerVariants}
          className="flex gap-2 flex-wrap"
        >
          {selectedMedia?.genres?.map((genre, index) =>
            genre == "Unknown" ? null : (
              <motion.span
                key={index}
                variants={itemVariants}
                className="px-3 py-1 bg-blue-600/30 rounded-full text-sm text-white"
              >
                {typeof genre === "string" ? genre : genre.name}
              </motion.span>
            )
          )}
        </motion.div>

        {/* Overview */}
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-semibold mb-3 text-white">Overview</h3>
          <p className="text-gray-300 leading-relaxed">
            {selectedMedia?.overview || "No overview available"}
          </p>
        </motion.div>

        {/* Cast */}
        <motion.div variants={containerVariants} className="mb-8">
          <h3 className="text-2xl font-bold mb-4 text-white border-b-2 border-indigo-500 pb-2">
            {type === "movie" ? "Cast" : "Starring"}
          </h3>
          <motion.div
            className="flex flex-wrap gap-3"
            variants={containerVariants}
          >
            {selectedMedia?.cast?.split(", ")?.map((actor, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="bg-gray-800/60 px-4 py-2 rounded-full hover:bg-indigo-500/20 transition-all duration-300 group">
                  <span className="text-gray-300 group-hover:text-indigo-300 font-medium">
                    {actor}
                  </span>
                  <span className="ml-2 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    ★
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          variants={containerVariants}
          className="flex gap-4 flex-wrap"
        >
          {watchTrailerButton}
          <Button
            variant="secondary"
            onClick={() => dispatch(addToWatchlistAction(selectedMedia))}
            disabled={isInWatchlist}
          >
            {isInWatchlist ? "✓ Already Added" : "👀 Add To Watchlist"}
          </Button>
          <Button variant="primary" onClick={onReviewClick}>
            ✍️ Add Review
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
