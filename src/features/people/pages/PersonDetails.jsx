import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTheaterMasks,
  FaStar,
  FaImdb,
  FaBirthdayCake,
  FaFilm,
} from "react-icons/fa";
import { Button } from "../../../shared/components/MyButton";
import { getPersonByIdAction } from "../peopleSlice";
import { MovieCard } from "../../../shared/components/MovieCard";

export function ActorDetails() {
  const { id } = useParams();
  const { selectedPerson, isLoading, errors } = useSelector(
    (store) => store.peopleSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPersonByIdAction(id));
  }, [id, dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 to-zinc-900">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent"
        >
          <div className="flex items-center gap-4 animate-pulse">
            <FaTheaterMasks className="text-5xl" />
            Crafting Stellar Profile...
          </div>
        </motion.div>
      </div>
    );
  }

  if (errors) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 to-zinc-900">
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="text-red-400 text-2xl bg-zinc-900/90 backdrop-blur-lg p-8 rounded-3xl border border-pink-500/30 shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚠️</span>
            <span>Error: {errors}</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!selectedPerson) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto space-y-12"
      >
        {/* Back Button */}
        <motion.div
          initial={{ x: -50 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <Button
            variant="ghost"
            className="flex items-center gap-3 group bg-zinc-900/50 hover:bg-zinc-800/70 border border-zinc-700/50 backdrop-blur-lg"
            asChild
          >
            <Link to="/people">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-amber-400 group-hover:text-pink-400 transition-colors"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span className="text-zinc-300 group-hover:text-amber-300 transition-colors">
                Back to Cosmic Gallery
              </span>
            </Link>
          </Button>
        </motion.div>

        {/* Actor Hero Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-zinc-900/50 rounded-3xl overflow-hidden border border-zinc-700/50 shadow-2xl backdrop-blur-sm"
        >
          {/* Actor Image */}
          <div className="relative aspect-[2/3] lg:col-span-1 group">
            <motion.img
              src={selectedPerson.profile_url || "/placeholder-actor.jpg"}
              alt={selectedPerson.name}
              className="w-full h-full object-cover transform transition-transform duration-500 "
              onError={(e) => {
                e.target.src = "/placeholder-actor.jpg";
                e.target.className =
                  "w-full h-full object-contain bg-zinc-800 p-8";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent" />

            {/* Popularity Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-zinc-900/80 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-400/30">
              <FaStar className="text-amber-400 animate-pulse" />
              <span className="text-amber-300 font-medium">
                {Math.round(selectedPerson.popularity)}
              </span>
            </div>
          </div>

          {/* Actor Info */}
          <div className="p-8 lg:col-span-2 flex flex-col justify-center space-y-8">
            {/* Name and Department */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent"
              >
                {selectedPerson.name}
              </motion.h1>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30">
                  <FaTheaterMasks className="text-blue-400" />
                  <span className="text-blue-300 font-medium">
                    {selectedPerson.known_for_department}
                  </span>
                </div>

                {selectedPerson.gender && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-400/30">
                    <span className="text-purple-300 font-medium">
                      {selectedPerson.gender === 1 ? "♀ Female" : "♂ Male"}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Biography */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-6"
            >
              <div className="border-l-4 border-amber-400 pl-4">
                <h2 className="text-3xl font-bold text-amber-300 mb-3">
                  Cosmic Journey
                </h2>
                <p className="text-zinc-300 leading-relaxed text-lg">
                  {selectedPerson.biography ||
                    `${
                      selectedPerson.name
                    } is a visionary ${selectedPerson.known_for_department.toLowerCase()} shaping the cinematic universe through extraordinary performances.`}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Filmography Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="space-y-10"
        >
          <div className="text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent inline-block">
              <FaFilm className="inline-block mr-3 mb-1 text-3xl" />
              Stellar Filmography
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {selectedPerson.known_for?.map((movie) => (
              <motion.div
                key={movie.id}
                whileHover={{ y: -5 }}
                className="group transition-all"
              >
                <MovieCard
                  imageUrl={movie.poster_url}
                  title={movie.title || movie.name}
                  rating={movie.vote_average}
                  showPlayButton={true}
                  id={movie.id}
                  typeOfCard="movie"
                  releaseDate={movie.release_date || movie.first_air_date}
                  overlayVariant="dark"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
