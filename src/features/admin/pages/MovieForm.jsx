import { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../../auth/AuthContext";

export function MovieForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setIsHeader } = useContext(AuthContext);

  setIsHeader(true);

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

  const renderInput = (label, name, type = "text") => (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-zinc-300 font-medium">
        {label}
      </Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={formData[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`bg-zinc-800/70 border-zinc-700 text-white hover:border-zinc-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 ${
          formErrors[name] && submitAttempted
            ? "border-red-500 bg-red-900/20 focus:border-red-500 focus:ring-red-500/50"
            : ""
        }`}
        required
      />
      {formErrors[name] && submitAttempted && (
        <p className="flex items-center gap-1 text-sm text-red-400">
          <ExclamationTriangleIcon className="inline-block size-4" />
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
      <Label htmlFor="category" className="text-zinc-300 font-medium">
        Category
      </Label>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-800/70 px-3 py-2 text-sm text-white ring-offset-zinc-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="top_rated">Top Rated</option>
        <option value="popular">Popular</option>
        <option value="upcoming">Upcoming</option>
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-8 shadow-2xl w-full max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent">
            {id === "0" ? "Add New Movie" : "Edit Movie"}
          </h3>
          <p className="text-zinc-400 mt-2">
            {id === "0"
              ? "Fill in the details to add a new movie"
              : "Update the movie information"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput("Title", "title")}
          {renderInput("Original Title", "original_title")}
          {renderInput("Poster URL", "poster_url")}
          {renderInput("Backdrop URL", "backdrop_url")}
          {renderInput("Release Date", "release_date", "date")}
          {renderInput("Original Language", "original_language")}
          {renderInput("Trailer URL", "trailer_url")}
          {renderInput("Cast (comma separated)", "cast")}
          {renderCategorySelect()}

          <div className="space-y-2">
            <Label htmlFor="genres" className="text-zinc-300 font-medium">
              Genres
            </Label>
            <select
              id="genres"
              name="genres"
              multiple
              value={formData.genres}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-800/70 px-3 py-2 text-sm text-white ring-offset-zinc-900 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                formErrors.genres && submitAttempted ? "border-red-500" : ""
              }`}
              required
            >
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="drama">Drama</option>
              <option value="horror">Horror</option>
              <option value="romance">Romance</option>
            </select>
            {formErrors.genres && submitAttempted && (
              <p className="flex items-center gap-1 text-sm text-red-400">
                <ExclamationTriangleIcon className="inline-block size-4" />
                {formErrors.genres}
              </p>
            )}
          </div>

          {renderInput("Vote Average (0-10)", "vote_average", "number")}
          {renderInput("Vote Count", "vote_count", "number")}
          {renderInput("Popularity", "popularity", "number")}

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="overview" className="text-zinc-300 font-medium">
              Overview
            </Label>
            <Textarea
              id="overview"
              name="overview"
              rows="4"
              value={formData.overview}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`bg-zinc-800/70 border-zinc-700 text-white hover:border-zinc-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 ${
                formErrors.overview && submitAttempted ? "border-red-500" : ""
              }`}
              required
            />
            {formErrors.overview && submitAttempted && (
              <p className="flex items-center gap-1 text-sm text-red-400">
                <ExclamationTriangleIcon className="inline-block size-4" />
                {formErrors.overview}
              </p>
            )}
          </div>

          <div className="md:col-span-2 flex items-center gap-3 pt-4">
            <Switch
              checked={formData.adult}
              onCheckedChange={handleSwitch}
              id="adult"
              className="data-[state=checked]:bg-amber-500 data-[state=unchecked]:bg-zinc-700"
            />
            <Label htmlFor="adult" className="text-zinc-300">
              Adult Content
            </Label>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-10">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/admin/movies")}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800/50 hover:text-white px-8 py-3 rounded-xl font-medium transition-all"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-amber-500 to-pink-600 hover:from-amber-400 hover:to-pink-500 text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-amber-500/20 transition-all"
          >
            {id === "0" ? (
              <div className="flex items-center gap-2">
                <MdAddTask className="size-5" />
                <span>Add Movie</span>
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
