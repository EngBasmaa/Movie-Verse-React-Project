import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "../../../shared/components/MyButton";
import { getSeriesByIdAction } from "../seriesSlice";
import MediaInfo from "../../movies/pages/MediaInfo";
import TrailerDialog from "../../movies/pages/TrailerDialog";
import AddReviewDialog from "../../movies/pages/AddReviewDialog";
import ReviewsSection from "../../movies/pages/ReviewsSection";
import RelatedMediaSlider from "../../movies/pages/RelatedMediaSlider";
import { filterSeriesByGenre } from "../../../shared/utils/seriesUtils";

export function SeriesDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { series, selectedSeries, isLoading, errors } = useSelector(
    (store) => store.seriesSlice
  );

  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const initialLoad = useRef(true);

  useEffect(() => {
    dispatch(getSeriesByIdAction(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (initialLoad.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      initialLoad.current = false;
      return;
    }

    const path = window.location.pathname;
    const isNewMedia = path.match(/\/series\/\d+/);

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

  const videoId = getYouTubeId(selectedSeries?.trailer_url);

  const relatedMedia = filterSeriesByGenre(
    series.filter((item) => item.id !== selectedSeries?.id),
    selectedSeries?.genres?.[0]
  );

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

  if (!selectedSeries) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <h1 className="text-white text-2xl">No series selected</h1>
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
        style={{ backgroundImage: `url(${selectedSeries?.backdrop_url})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-900/50" />
      </motion.div>

      {/* Content */}
      <motion.div
        initial="hidden"
        viewport={{ once: true }}
        whileInView="visible"
        className="relative max-w-7xl mx-auto px-4 py-12"
      >
        {/* Trailer Dialog */}
        <Dialog>
          <MediaInfo
            selectedMedia={selectedSeries}
            type="series"
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

          {/* Trailer Dialog Content */}
          <TrailerDialog
            open={!!videoId}
            videoId={videoId}
            mediaTitle={
              selectedSeries?.title || selectedSeries?.name || "Series"
            }
          />
        </Dialog>

        {/* Add Review Dialog */}
        <AddReviewDialog
          open={isReviewDialogOpen}
          onOpenChange={setIsReviewDialogOpen}
          selectedMedia={selectedSeries}
          type="series"
          id={id}
        />

        {/* Reviews Section */}
        <ReviewsSection reviews={selectedSeries?.reviews} />

        {/* Related Media Slider */}
        <RelatedMediaSlider relatedMedia={relatedMedia} type="series" />
      </motion.div>
    </div>
  );
}
