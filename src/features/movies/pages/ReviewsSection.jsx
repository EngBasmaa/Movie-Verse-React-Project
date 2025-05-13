import { motion } from "framer-motion";

const getRatingColor = (rating) => {
  if (rating >= 8) return "bg-green-500";
  if (rating >= 6) return "bg-yellow-500";
  if (rating >= 4) return "bg-orange-500";
  return "bg-red-500";
};

export default function ReviewsSection({ reviews }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="mt-12"
    >
      <motion.h2
        className="text-2xl font-bold mb-8 text-white"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        Reviews ({reviews?.length || 0})
        <motion.div
          className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mt-2 w-1/3"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!reviews || reviews.length === 0 ? (
          <p className="text-center mt-8 text-3xl font-bold text-white">
            No Reviews Yet
          </p>
        ) : (
          reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  {review.author_details?.avatar_path ? (
                    <img
                      className="w-10 h-10 rounded-full"
                      src={`https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`}
                      alt={review.author}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
                      {review.author?.charAt(0).toUpperCase() || "A"}
                    </div>
                  )}
                  <span className="font-medium text-white">
                    {review.author || "Anonymous"}
                  </span>
                </div>
                {review.author_details?.rating && (
                  <div
                    className={`${getRatingColor(
                      review.author_details.rating
                    )} w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white`}
                  >
                    {review.author_details.rating.toFixed(1)}
                  </div>
                )}
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {review.content?.substring(0, 200) || "No content available"}
              </p>
              <div className="text-sm text-gray-400 text-right">
                {review.created_at
                  ? new Date(review.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Date not available"}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
