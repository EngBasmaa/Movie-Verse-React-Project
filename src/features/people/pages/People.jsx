import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTheaterMasks, FaStar } from "react-icons/fa";
import { Button } from "../../../shared/components/MyButton";
import { getAllPeopleAction } from "../peopleSlice";

export function People() {
  const { people, isLoading, errors } = useSelector(
    (store) => store.peopleSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPeopleAction());
    window.scrollTo(0, 0);
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 to-zinc-900">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent"
        >
          <div className="flex items-center gap-4">
            <FaTheaterMasks className="animate-pulse text-5xl" />
            <span>Loading Stellar Cast...</span>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 p-6 md:p-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto space-y-12"
      >
        {/* Header Section */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="text-center space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            Galaxy of Stars
          </h1>
          <p className="text-zinc-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Explore the brilliant constellation of talent shaping the cinematic
            universe
          </p>
        </motion.div>

        {/* Actors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {people.map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, type: "spring" }}
                whileHover={{ y: -10 }}
                className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-[0_10px_40px_rgba(245,158,11,0.2)] transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <motion.img
                    src={person.profile_url}
                    alt={person.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = "/placeholder-actor.jpg";
                      e.target.className =
                        "w-full h-full object-contain bg-zinc-800 p-8";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent" />

                  {/* Popularity Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-zinc-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-amber-400 border border-amber-400/30">
                    <FaStar className="text-yellow-400" />
                    <span>{Math.round(person.popularity)}</span>
                  </div>
                </div>

                {/* Info Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                  {/* Department Tag */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/20 rounded-full border border-pink-400/30 mb-3 w-fit">
                    <FaTheaterMasks className="text-pink-400 text-sm" />
                    <span className="text-pink-300 text-sm font-medium">
                      {person.known_for_department}
                    </span>
                  </div>

                  {/* Name */}
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {person.name}
                  </h2>

                  {/* Known For Works */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {person.known_for?.slice(0, 3).map((work) => (
                      <div
                        key={work.id}
                        className="text-xs px-3 py-1.5 rounded-xl bg-zinc-800/70 hover:bg-pink-500/30 border border-zinc-700 hover:border-pink-400 transition-all"
                      >
                        <span className="text-pink-400 me-1">✦</span>
                        <span className="truncate text-white">
                          {work.title || work.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* View Profile Button */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      variant="primary"
                      className="w-full bg-gradient-to-r from-amber-500 to-pink-600 hover:from-amber-400 hover:to-pink-500 shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)]"
                      asChild
                    >
                      <Link
                        to={`/people/${person.id}`}
                        className="flex items-center justify-center gap-2"
                      >
                        <FaTheaterMasks />
                        View Profile
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
