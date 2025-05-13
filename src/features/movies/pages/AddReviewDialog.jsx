import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../../../shared/components/MyButton";
import { useDispatch } from "react-redux";
import { getMovieByIdAction } from "../movieSlice";
import { getSeriesByIdAction } from "../../series/seriesSlice";

export default function AddReviewDialog({
  open,
  onOpenChange,
  selectedMedia,
  type,
  id,
}) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newReview = {
      author: formData.name,
      author_details: {
        name: formData.name,
        username: formData.name.toLowerCase().replace(/\s/g, "-"),
        avatar_path: null,
        rating: Number(formData.rating),
      },
      content: formData.content,
      created_at: new Date().toISOString(),
      id: Math.random().toString(36).substr(2, 9),
    };

    try {
      const url = `http://localhost:3001/${
        type === "movie" ? "movies" : "series"
      }/${id}`;
      const response = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviews: [...selectedMedia.reviews, newReview],
        }),
      });

      if (!response.ok) throw new Error("Failed to submit review");

      type === "movie"
        ? dispatch(getMovieByIdAction(id))
        : dispatch(getSeriesByIdAction(id));

      onOpenChange(false);
      setFormData({ name: "", rating: "", content: "" });
    } catch (error) {
      console.error("Review submission error:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 text-white border border-zinc-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-900 bg-clip-text text-transparent">
            Write a Review
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-zinc-800 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Rating (1-10)
            </label>
            <input
              type="number"
              name="rating"
              min="1"
              max="10"
              step="0.1"
              value={formData.rating}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-zinc-800 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Review Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-zinc-800 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="hover:shadow-[0_0_15px_#3b82f6] transition-all"
            >
              Submit Review
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
