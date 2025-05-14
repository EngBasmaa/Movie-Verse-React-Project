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
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
        >
          <div className="flex items-center gap-3">
            <FaTheaterMasks className="animate-spin-slow" />
            Loading Stellar Cast...
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

  return (
    <div className="min-h-screen bg-zinc-950 p-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto space-y-12"
      >
        {/* Header Section */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            Galaxy of Stars
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Explore the brilliant constellation of talent shaping the cinematic
            universe
          </p>
        </motion.div>

        {/* Actors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence>
            {people.map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)] transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <motion.img
                    src={person.profile_url}
                    alt={person.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = "/placeholder-actor.jpg";
                      e.target.className =
                        "w-full h-full object-contain bg-zinc-800 p-4";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent" />

                  {/* Popularity Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-zinc-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-cyan-400">
                    <FaStar className="text-yellow-400" />
                    <span>{Math.round(person.popularity)}</span>
                  </div>
                </div>

                {/* Info Overlay */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6 space-y-4 bg-gradient-to-t from-zinc-900 via-zinc-900/90 to-transparent backdrop-blur-lg"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  {/* Department Tag */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full border border-blue-400/30">
                    <FaTheaterMasks className="text-blue-400 text-sm" />
                    <span className="text-blue-300 text-sm font-medium">
                      {person.known_for_department}
                    </span>
                  </div>

                  {/* Name */}
                  <h2 className="text-2xl font-bold text-white">
                    {person.name}
                  </h2>

                  {/* Known For Works */}
                  <div className="flex flex-wrap gap-2">
                    {person.known_for?.slice(0, 3).map((work) => (
                      <div
                        key={work.id}
                        className="text-xs px-3 py-1.5 rounded-xl bg-zinc-800/50 hover:bg-blue-500/20 border border-zinc-700 hover:border-blue-400 transition-all"
                      >
                        <span className="text-blue-400 me-1">✦</span>
                        <span className="truncate text-white">
                          {work.title}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* View Profile Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="primary"
                      className="w-full mt-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                      asChild
                    >
                      <Link
                        to={`/people/${person.id}`}
                        className="flex items-center justify-center gap-2"
                      >
                        <FaTheaterMasks />
                        View Stellar Profile
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
