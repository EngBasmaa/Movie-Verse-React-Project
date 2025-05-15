import clsx from "clsx";
import { FaStar, FaStarHalfAlt, FaRegStar, FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

export function MovieCard({
  imageUrl,
  title,
  rating,
  releaseDate,
  showPlayButton = false,
  overlayVariant = "default",
  imageOnly = false,
  width,
  height,
  children,
  className,
  typeOfCard = "movie",
  id = 0,
}) {
  const overlayStyles = {
    default: "bg-gradient-to-t from-black/80 via-black/30 to-transparent",
    pink: "bg-gradient-to-t from-pink-600/80 via-pink-300/40 to-transparent",
    blue: "bg-gradient-to-t from-blue-600/80 via-blue-300/40 to-transparent",
    purple:
      "bg-gradient-to-t from-purple-600/80 via-purple-300/40 to-transparent",
    orange:
      "bg-gradient-to-t from-orange-600/80 via-orange-300/40 to-transparent",
    teal: "bg-gradient-to-t from-teal-600/80 via-teal-300/40 to-transparent",
    red: "bg-gradient-to-t from-red-600/80 via-red-300/40 to-transparent",
    gold: "bg-gradient-to-t from-yellow-600/80 via-yellow-300/40 to-transparent",
    green: "bg-gradient-to-t from-green-600/80 via-green-300/40 to-transparent",
    dark: "bg-gradient-to-t from-gray-900/90 via-gray-800/50 to-transparent",
    none: "",
  };

  const cardStyle =
    width && height ? { width: `${width}px`, height: `${height}px` } : {};

  if (imageOnly) {
    return (
      <div
        style={cardStyle}
        className={clsx(
          "relative rounded-3xl overflow-hidden shadow-lg transition-transform",
          "w-full h-full aspect-[2/3]",
          className
        )}
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      style={cardStyle}
      className={clsx(
        "relative group overflow-hidden rounded-3xl shadow-2xl",
        "transition-transform duration-300 hover:scale-[1.02]",
        "w-full h-full max-h-[500px] aspect-[2/3]",
        className
      )}
    >
      {/* Image container */}
      <div className="relative w-full h-full">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x450?text=No+Image";
            e.target.className = "w-full h-full object-contain bg-gray-800";
          }}
        />

        {/* Overlay */}
        <div
          className={clsx(
            "absolute inset-0 z-10 opacity-0 group-hover:opacity-100",
            "transition-opacity duration-300",
            overlayStyles[overlayVariant]
          )}
        />
      </div>

      {/* Bottom content - fixed positioning */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
        <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg max-w-full overflow-hidden">
            <h3 className="text-white text-lg font-bold mb-2 truncate">
              {title}
            </h3>
            <div className="flex flex-wrap justify-between items-center text-sm text-white/80">
              <div className="flex items-center gap-1 text-yellow-400 min-w-0">
                {Array.from({ length: 5 }, (_, i) => {
                  const starRating = (rating / 10) * 5;
                  if (starRating >= i + 1)
                    return <FaStar key={i} className="shrink-0" />;
                  else if (starRating >= i + 0.5)
                    return <FaStarHalfAlt key={i} className="shrink-0" />;
                  else return <FaRegStar key={i} className="shrink-0" />;
                })}
                <span className="text-white text-xs ml-2 truncate">
                  ({typeof rating === "number" ? rating.toFixed(1) : rating}/10)
                </span>
              </div>
              <span className="shrink-0 whitespace-nowrap">
                {new Date(releaseDate).getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Play button */}
      {showPlayButton &&
        (typeOfCard === "movie" ? (
          <Link
            to={`/media/movie/${id}`}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer focus:outline-none"
          >
            <div className="bg-zinc-900/90 backdrop-blur-md rounded-full p-3 shadow-lg transition-transform hover:scale-110 hover:shadow-xl">
              <FaPlay className="w-5 h-5 text-white" />
            </div>
          </Link>
        ) : (
          <Link
            to={`/media/series/${id}`}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 cursor-pointer focus:outline-none"
          >
            <div className="bg-zinc-900/90 backdrop-blur-md rounded-full p-3 shadow-lg transition-transform hover:scale-110 hover:shadow-xl">
              <FaPlay className="w-5 h-5 text-white" />
            </div>
          </Link>
        ))}

      {children && (
        <div className="absolute top-4 right-4 z-40">{children}</div>
      )}
    </div>
  );
}
