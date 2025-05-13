// components/MovieDetailsModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import PropTypes from "prop-types";

export function MyModal({ open, onOpenChange, movie }) {
  if (!movie) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[90vh]  overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="mb-5">
            {movie.title}
                  </DialogTitle>
                  <DialogDescription>
      {movie?.overview}
    </DialogDescription>
        </DialogHeader>
              <div className="mt-4">
           
             
          <img
            src={movie.poster_url}
            alt={movie.title}
            className="w-full rounded mb-4"
          />
          <p className="mb-4">
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p className="mb-4">
            <strong>Genres:</strong> {movie.genres.join(", ")}
          </p>
          <p className="mb-4">
            <strong>Rating:</strong> ⭐ {movie.vote_average}
          </p>
          <p className="mb-4">
            <strong>Votes:</strong> {movie.vote_count}
          </p>
          <p className="mb-4">
            <strong>Audience:</strong>{" "}
            {movie.adult ? "Adults 🔞" : "General 🧒"}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

MyModal.propTypes = {
  open: PropTypes.bool,
  onOpenChange: PropTypes.func,
  movie: PropTypes.object
};
