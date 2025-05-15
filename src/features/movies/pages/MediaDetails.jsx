import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getMovieByIdAction } from "../movieSlice";
import { getSeriesByIdAction } from "../../series/seriesSlice";
import { filterByCategory } from "../../../shared/utils/movieUtils";
import { fetchWatchlistAction } from "../../movies/watchlistSlice";
import { filterSeriesByGenre } from "../../../shared/utils/seriesUtils";
import { getAllPeopleAction } from "../../people/peopleSlice";
import { Dialog } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { DialogTrigger } from "@/components/ui/dialog";

import MediaInfo from "./MediaInfo";
import TrailerDialog from "./TrailerDialog";
import AddReviewDialog from "./AddReviewDialog";
import ReviewsSection from "./ReviewsSection";
import RelatedMediaSlider from "./RelatedMediaSlider";
import { Button } from "../../../shared/components/MyButton";

export function MediaDetails() {
  const { id, type } = useParams();
  const dispatch = useDispatch();

  const {
    movies,
    selectedMovie,
    isLoading: movieLoading,
    errors: movieErrors,
  } = useSelector((store) => store.movieSlice);
  const {
    series,
    selectedSeries,
    isLoading: seriesLoading,
    errors: seriesErrors,
  } = useSelector((store) => store.seriesSlice);
  const { people } = useSelector((store) => store.peopleSlice);

  const [selectedMedia, setSelectedMedia] = useState(null);
  const isLoading = type === "movie" ? movieLoading : seriesLoading;
  const errors = type === "movie" ? movieErrors : seriesErrors;

  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const initialLoad = useRef(true);

  useEffect(() => {
    dispatch(getAllPeopleAction());
  }, [dispatch]);

  useEffect(() => {
    if (type === "movie") {
      dispatch(getMovieByIdAction(id))
        .unwrap()
        .catch((error) => {
          console.log("Fallback to people data...");
        });
    } else {
      dispatch(getSeriesByIdAction(id));
    }
  }, [id, type, dispatch]);

  useEffect(() => {
    if (type === "movie") {
      if (selectedMovie) {
        setSelectedMedia(selectedMovie);
      } else if (people.length > 0) {
        const foundMovie = people
          .flatMap((person) => person.known_for)
          .find((movie) => movie?.id === parseInt(id));
        setSelectedMedia(foundMovie || null);
      }
    } else {
      setSelectedMedia(selectedSeries);
    }
  }, [selectedMovie, selectedSeries, people, id, type]);

  useEffect(() => {
    dispatch(fetchWatchlistAction());
  }, [dispatch]);

  useEffect(() => {
    if (initialLoad.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      initialLoad.current = false;
      return;
    }

    const path = window.location.pathname;
    const isNewMedia = path.match(/\/movie\/\d+|\/series\/\d+/);

    if (!isLoading && isNewMedia && !initialLoad.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isLoading]);

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(selectedMedia?.trailer_url);

  const relatedMedia =
    type === "movie"
      ? filterByCategory(movies, selectedMedia?.category)?.filter(
          (movie) => movie.id !== selectedMedia?.id
        )
      : filterSeriesByGenre(series, selectedMedia?.genres?.[0])?.filter(
          (series) => series.id !== selectedMedia?.id
        );

  const validTypes = ["movie", "series"];
  const isValidType = validTypes.includes(type);

  if (!isValidType) {
    return <Navigate to="/NotFound" />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <h1 className="text-white text-2xl">Loading...</h1>
      </div>
    );
  }

  if (errors) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <h1 className="text-red-500 text-2xl">Error: {errors}</h1>
      </div>
    );
  }

  if (!selectedMedia) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <h1 className="text-white text-2xl">Media not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 relative">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        whileInView={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${selectedMedia?.backdrop_url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 to-gray-900/50" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial="hidden"
        viewport={{ once: true }}
        whileInView="visible"
        className="relative max-w-7xl mx-auto px-4 py-12"
      >
        <Dialog>
          <MediaInfo
            selectedMedia={selectedMedia}
            type={type}
            onReviewClick={() => setIsReviewDialogOpen(true)}
            watchTrailerButton={
              <DialogTrigger asChild>
                <Button
                  variant="primary"
                  className="gap-2 transition-transform duration-300 shadow-[0_0_10px_#3b82f670] hover:shadow-[0_0_10px_#111111] hover:-translate-y-1"
                >
                  <span className="text-xl">▶</span> Watch Trailer
                </Button>
              </DialogTrigger>
            }
          />

          <TrailerDialog
            open={!!videoId}
            videoId={videoId}
            mediaTitle={selectedMedia?.title || selectedMedia?.name || "Media"}
          />
        </Dialog>

        <AddReviewDialog
          open={isReviewDialogOpen}
          onOpenChange={setIsReviewDialogOpen}
          selectedMedia={selectedMedia}
          type={type}
          id={id}
        />

        <ReviewsSection reviews={selectedMedia?.reviews} />

        <RelatedMediaSlider relatedMedia={relatedMedia} type={type} />
      </motion.div>
    </div>
  );
}
