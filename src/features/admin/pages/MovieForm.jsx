import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { MdAddTask } from "react-icons/md";
import { getMovieById } from "../../movies/movieApi";
import { useDispatch } from "react-redux";
import { addMovieAction, editMovieAction } from "../../movies/movieSlice";
import { v4 as uuidv4 } from "uuid";

export function MovieForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    original_title: "",
    poster_url: "",
    backdrop_url: "",
    release_date: "",
    original_language: "",
    genres: [],
    overview: "",
    vote_average: "",
    vote_count: "",
    popularity: "",
    reviews: "[]",
    adult: false,
    trailer_url: "",
    cast: "",
    category: "general",
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    if (id !== "0") {
      getMovieById(id).then((response) => {
        const formattedData = {
          ...response.data,
          reviews: JSON.stringify(response.data.reviews || []),
        };
        setFormData(formattedData);
      });
    }
  }, [id]);

  const validateField = (name, value) => {
    let error = "";
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    switch (name) {
      case "title":
      case "original_title":
      case "original_language":
      case "overview":
      case "cast":
        if (!value.trim()) {
          error = "This field is required.";
        } else if (value.trim().length < 2) {
          error = "Must be at least 3 characters long.";
        }
        break;

      case "poster_url":
      case "backdrop_url":
      case "trailer_url":
        if (!value.trim()) {
          error = "This field is required.";
        } else if (!urlPattern.test(value)) {
          error = "Please enter a valid URL.";
        }
        break;

      case "release_date":
        if (!value) error = "Please enter a release date.";
        break;

      case "vote_average":
        if (isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > 10)
          error = "Must be a number between 0 and 10.";
        break;

      case "vote_count":
      case "popularity":
        if (isNaN(value) || parseInt(value) < 0)
          error = "Must be a non-negative number.";
        break;

      case "genres":
        if (!value.length) error = "At least one genre is required.";
        break;

      case "category":
        if (!["top_rated", "popular", "upcoming"].includes(value)) {
          error = "Invalid category";
        }
        break;
    }
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  // إضافة الدالة المفقودة renderInput هنا
  const renderInput = (label, name, type = "text") => (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`bg-zinc-700 text-white ${
          formErrors[name] && submitAttempted
            ? "border-red-500 bg-red-100 text-red-800"
            : "border-zinc-600"
        }`}
        required
      />
      {formErrors[name] && (
        <p className="text-sm text-red-500">
          <ExclamationTriangleIcon className="inline-block mr-1 align-text-bottom" />
          {formErrors[name]}
        </p>
      )}
    </div>
  );

  const handleChange = (e) => {
    const { name, value, multiple } = e.target;

    if (multiple) {
      setFormData({
        ...formData,
        [name]: Array.from(e.target.selectedOptions, (option) => option.value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    validateField(name, value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSwitch = (checked) => {
    setFormData((prev) => ({ ...prev, adult: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    const formattedData = {
      ...formData,
      vote_average: Number(formData.vote_average),
      vote_count: Number(formData.vote_count),
      popularity: Number(formData.popularity),
      release_date: new Date(formData.release_date).toISOString(),
      reviews: JSON.parse(formData.reviews),
      id: id && id !== "0" ? id : uuidv4(),
    };

    const movieAction =
      id && id !== "0"
        ? editMovieAction({ id, formValues: formattedData })
        : addMovieAction(formattedData);

    dispatch(movieAction)
      .then(() => {
        navigate("/admin/movies");
        setFormData({
          title: "",
          original_title: "",
          poster_url: "",
          backdrop_url: "",
          release_date: "",
          original_language: "",
          genres: [],
          overview: "",
          vote_average: "",
          vote_count: "",
          popularity: "",
          reviews: "[]",
          adult: false,
          trailer_url: "",
          cast: "",
          category: "general",
        });
      })
      .catch((err) => {
        console.error("Operation failed:", err);
      });
  };

  const renderCategorySelect = () => (
    <div className="space-y-2">
      <Label htmlFor="category">Category</Label>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="bg-zinc-700 text-white rounded-md px-3 py-2 w-full"
      >
        <option value="top_rated">Top Rated</option>
        <option value="popular">Popular</option>
        <option value="upcoming">Upcoming</option>
      </select>
    </div>
  );

  return (
    <div className="bg-zinc-800 p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-red-100 border border-pink-700 rounded-2xl p-8 shadow-xl w-full max-w-4xl mx-auto text-pink-700"
      >
        <h3 className="text-2xl font-bold text-pink-700 mb-6 text-center">
          {id === "0" ? "🎬 Add New Movie" : "✏️ Edit Movie"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput("Title", "title")}
          {renderInput("Original Title", "original_title")}
          {renderInput("Poster URL", "poster_url")}
          {renderInput("Backdrop URL", "backdrop_url")}
          {renderInput("Release Date", "release_date", "date")}
          {renderInput("Original Language", "original_language")}
          {renderInput("Trailer URL", "trailer_url")}
          {renderInput("Cast", "cast")}
          {renderCategorySelect()}

          <div className="space-y-2">
            <Label htmlFor="genres">Genres</Label>
            <select
              id="genres"
              name="genres"
              multiple
              value={formData.genres}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`bg-zinc-700 text-white rounded-md px-3 py-2 w-full ${
                formErrors.genres && submitAttempted
                  ? "border-red-500 bg-red-100 text-red-800"
                  : "border-zinc-600"
              }`}
              required
            >
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="horror">Horror</option>
              <option value="romance">Romance</option>
            </select>
            {formErrors.genres && (
              <p className="text-sm text-red-500">
                <ExclamationTriangleIcon className="inline-block mr-1 align-text-bottom" />
                {formErrors.genres}
              </p>
            )}
          </div>

          {renderInput("Vote Average", "vote_average", "number")}
          {renderInput("Vote Count", "vote_count", "number")}
          {renderInput("Popularity", "popularity", "number")}

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="reviews">Reviews (JSON format)</Label>
            <Textarea
              id="reviews"
              name="reviews"
              value={formData.reviews}
              onChange={handleChange}
              rows="6"
              className="bg-zinc-700 text-white"
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-3 pt-4">
            <Switch
              checked={formData.adult}
              onCheckedChange={handleSwitch}
              id="adult"
            />
            <Label htmlFor="adult">Adult Only?</Label>
          </div>
        </div>

        <div className="text-center mt-8">
          <Button
            type="submit"
            className="bg-pink-700 hover:bg-pink-800 text-white px-6 py-3 rounded-xl text-sm font-medium"
          >
            {id === "0" ? (
              <>
                <MdAddTask className="inline-block mr-2 size-6" />
                Add Movie
              </>
            ) : (
              "✏️ Edit Movie"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
