import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";

export default function TrailerDialog({ open, videoId, mediaTitle }) {
  return (
    <AnimatePresence>
      {open && (
        <DialogContent
          className="max-w-[95vw] w-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border-2 border-blue-500/30 backdrop-blur-2xl rounded-2xl overflow-hidden"
          style={{
            width: "60vw",
            minWidth: "383px",
            maxWidth: "none",
          }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, rotateX: 45, y: 50 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: -20 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1,
            }}
          >
            {/* Radial gradient overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_center,#3b82f630_0%,transparent_60%)]"
            />

            {/* Title */}
            <DialogHeader className="relative z-10 px-4 mb-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-xl">
                  {mediaTitle} - Trailer
                </DialogTitle>
              </motion.div>
            </DialogHeader>

            {/* Video or Fallback */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10 aspect-video group pb-6 px-6"
            >
              <div className="absolute inset-0 rounded-xl overflow-hidden shadow-[0_0_40px_#3b82f630]">
                {videoId ? (
                  <motion.iframe
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="w-full h-full rounded-lg transform transition-transform duration-300"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <p className="text-center mt-8 text-3xl font-bold text-white">
                    No trailer available
                  </p>
                )}
              </div>
            </motion.div>

            {/* Animated Bottom Gradient */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/90 to-transparent"
            />
          </motion.div>
        </DialogContent>
      )}
    </AnimatePresence>
  );
}
