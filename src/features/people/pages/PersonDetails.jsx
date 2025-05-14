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
// First: Import the MovieCard component at the top
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
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent"
        >
          <div className="flex items-center gap-3">
            <FaTheaterMasks className="animate-spin-slow" />
            Preparing Stellar Profile...
          </div>
        </motion.div>
      </div>
    );
  }

  if (errors) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="text-red-400 text-xl bg-zinc-900/80 backdrop-blur-lg p-8 rounded-2xl border border-red-400/30 shadow-xl"
        >
          ⚠️ Error: {errors}
        </motion.div>
      </div>
    );
  }

  if (!selectedPerson) return null;

  // Find the actor's role in each movie
  const getActorRole = (movieId) => {
    const movie = selectedPerson.known_for.find((m) => m.id === movieId);
    if (!movie) return "Unknown Role";

    // Extract actor's name from cast string
    const castList = movie.cast?.split(", ") || [];
    const actorIndex = castList.findIndex((name) =>
      name.toLowerCase().includes(selectedPerson.name.toLowerCase())
    );

    if (actorIndex !== -1) {
      // Try to find character name if available
      return (
        castList[actorIndex].replace(selectedPerson.name, "").trim() || "Actor"
      );
    }
    return "Actor";
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto space-y-12"
      >
        {/* Back Button */}
        <motion.div initial={{ x: -50 }} animate={{ x: 0 }}>
          <Button
            variant="secondary"
            className="flex items-center w-fit gap-2 bg-zinc-900/50 hover:bg-zinc-800/70 border border-zinc-700/50"
            asChild
          >
            <Link to="/people">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Galaxy of Stars
            </Link>
          </Button>
        </motion.div>
        {/* Actor Hero Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-zinc-900/50 rounded-3xl overflow-hidden border border-zinc-800/50 shadow-2xl"
        >
          {/* Actor Image */}
          <div className="relative aspect-[2/3] lg:col-span-1">
            <motion.img
              src={selectedPerson.profile_url || `/placeholder-actor.jpg`}
              alt={selectedPerson.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/placeholder-actor.jpg";
                e.target.className =
                  "w-full h-full object-contain bg-zinc-800 p-4";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent" />
          </div>

          {/* Actor Info */}
          <div className="p-6 lg:col-span-2 flex flex-col justify-center">
            <div className="space-y-6">
              {/* Name and Popularity */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent"
                >
                  {selectedPerson.name}
                </motion.h1>
                <div className="flex items-center gap-2 bg-zinc-800/80 backdrop-blur-sm px-4 py-2 rounded-full text-lg text-amber-400 border border-amber-400/30">
                  <FaStar className="text-yellow-400" />
                  <span>{Math.round(selectedPerson.popularity)}</span>
                </div>
              </div>

              {/* Department */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-400/30">
                  <FaTheaterMasks className="text-blue-400" />
                  <span className="text-blue-300 font-medium">
                    {selectedPerson.known_for_department}
                  </span>
                </div>

                {selectedPerson.gender && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-400/30">
                    <span className="text-purple-300 font-medium">
                      {selectedPerson.gender === 1 ? "Female" : "Male"}
                    </span>
                  </div>
                )}
              </div>

              {/* Biography Placeholder */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold text-zinc-200">
                  Stellar Journey
                </h2>
                <p className="text-zinc-400 leading-relaxed">
                  {selectedPerson.biography ||
                    `${selectedPerson.name} is a talented ${selectedPerson.known_for_department} known for their work in various productions.`}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
        {/* Filmography Section */}
        // تعديل جزء عرض Filmography ليصبح كالتالي:
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            <FaFilm className="inline mr-3" />
            Cosmic Filmography
          </h2>

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
