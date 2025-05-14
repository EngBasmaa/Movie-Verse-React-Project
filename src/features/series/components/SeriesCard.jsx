import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function SeriesCard({ series }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="series-card bg-zinc-800 rounded-lg overflow-hidden shadow-lg"
    >
      <Link to={`/series/${series.id}`} className="block">
        <div className="relative">
          <img
            src={series.poster_url || "/default-poster.jpg"}
            alt={series.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-white font-bold text-lg">{series.title}</h3>
            <div className="flex items-center mt-1">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-white">{series.vote_average?.toFixed(1) || "N/A"}</span>
            </div>
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-300 text-sm">{series.genres?.join(", ")}</p>
          <p className="text-gray-400 text-xs mt-2">
            {series.first_air_date ? new Date(series.first_air_date).getFullYear() : "Unknown"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}