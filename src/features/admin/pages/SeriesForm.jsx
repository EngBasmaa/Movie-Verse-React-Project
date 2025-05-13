import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { MdAddTask } from "react-icons/md";
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import {  getSeriesById } from "../../series/seriesApi";
import { useDispatch } from "react-redux";
import { addSeriesAction, editSeriesAction } from "../../series/seriesSlice";


export function SeriesForm() {
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
    reviews: "",
    adult: false
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    if (id != 0) {
      getSeriesById(id).then((response) => {
        setFormData(response.data);
      })
    }
},[id])
  
    const validateField = (name, value) => {
      let error = "";
      const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i; // URL regex pattern
    
      switch (name) {
        case "title":
        case "original_title":
        case "original_language":
        case "overview":
          if (!value.trim()) {
            error = "This field is required.";
          } else if (value.trim().length < 2) {
            error = "The name must be at least 3 characters long.";
          }
          break;
    
        case "poster_url":
        case "backdrop_url":
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
          if (
            !value ||
            isNaN(value) ||
            parseFloat(value) < 0 ||
            parseFloat(value) > 10
          )
            error = "Vote average must be a number between 0 and 10.";
          break;
    
        case "vote_count":
        case "popularity":
          if (!value || isNaN(value) || parseInt(value) < 0)
            error = "Please enter a valid non-negative number.";
          break;
    
        case "genres":
          if (!value.length) error = "At least one genre is required.";
          break;
    
        default:
          break;
      }
      setFormErrors(prev => ({ ...prev, [name]: error }));
    };
    
  
    const handleChange = e => {
      const { name, value, multiple } = e.target;
  
      if (multiple) {
        // If it's a multiple select, store selected values as an array
        setFormData({
          ...formData,
          [name]: Array.from(e.target.selectedOptions, option => option.value)
        });
      } else {
        setFormData({
          ...formData,
          [name]: value
        });
      }
      validateField(name, value);
    };
  
    const handleBlur = e => {
      const { name, value } = e.target;
      validateField(name, value);
    };
  
    const handleSwitch = checked => {
      setFormData(prev => ({ ...prev, adult: checked }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setSubmitAttempted(true);
    
      const errors = {};
      Object.entries(formData).forEach(([key, value]) => {
        validateField(key, value);
        if (formErrors[key]) errors[key] = formErrors[key];
      });
    
      setFormErrors(errors);
      if (Object.keys(errors).length > 0) return;
    
      const movieAction = id && id !== "0" ? editSeriesAction({ id, formValues: formData }) : addSeriesAction(formData);
  
      // logic
      if (id && id !== "0") {
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
              reviews: "",
              adult: false,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        dispatch(addSeriesAction(formData))
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
              reviews: "",
              adult: false,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    
    
  
    const renderInput = (label, name, type = "text") =>
      <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={formData[name]}
        onInput={handleChange}
        onBlur={handleBlur}
        className={`bg-zinc-800 text-white ${formErrors[name] && submitAttempted ? "border-red-500 bg-red-100 text-red-800" : "border-zinc-600"}`}
        required={["title", "original_title", "poster_url", "backdrop_url", "release_date", "original_language", "genres", "overview"].includes(name)}
      />
      {formErrors[name] && (
        <p className="text-sm text-red-500">
          <ExclamationTriangleIcon className="inline-block mr-1 align-text-bottom" />
          {formErrors[name]}
        </p>
      )}
    </div>
  

  return (
    <div className="bg-zinc-800">
    <form
      onSubmit={handleSubmit}
      className="bg-red-100 border text-pink-700 border-gray-200 rounded-2xl p-8 shadow-xl w-full max-w-4xl mx-auto"
    >
      <h3 className="text-2xl font-bold text-pink-700 mb-6 text-center">
        {id == 0 ? "🎬 Add New Series" : "✏️ Edit Series"}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderInput("Title", "title")}
        {renderInput("Original Title", "original_title")}
        {renderInput("Poster URL", "poster_url")}
        {renderInput("Backdrop URL", "backdrop_url")}
        {renderInput("Release Date", "release_date", "date")}
        {renderInput("Original Language", "original_language")}

        <div className="space-y-2">
          <Label htmlFor="genres">Genres</Label>
          <select
            id="genres"
            name="genres"
            multiple
            value={formData.genres}
            onChange={handleChange}
            onBlur={handleBlur} // Add onBlur to trigger validation
            className={`border ${formErrors.genres && submitAttempted
              ? "border-red-500"
              : ""}`}
            required
          >
            <option value="action">Action</option>
            <option value="comedy">Comedy</option>
            <option value="drama">Drama</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
          </select>
          {formErrors.genres &&
            <p className="text-sm text-red-500">
              <ExclamationTriangleIcon className="inline-block mr-1 align-text-bottom" />
              {formErrors.genres}
            </p>}
        </div>

        {renderInput("Vote Average", "vote_average", "number")}
        {renderInput("Vote Count", "vote_count", "number")}
        {renderInput("Popularity", "popularity", "number")}

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="overview">Overview</Label>
          <Textarea
            id="overview"
            name="overview"
            rows="4"
            value={formData.overview}
            onInput={handleChange}
            onBlur={handleBlur} // Add onBlur to trigger validation
            className={`${formErrors.overview && submitAttempted
              ? "border-red-500"
              : ""} ${formErrors.overview && submitAttempted
              ? "focus-visible:ring-red-500 focus-visible:ring-offset-2"
              : ""}`}
            required
          />
          {formErrors.overview &&
            <p className="text-sm text-red-500">
              <ExclamationTriangleIcon className="inline-block mr-1 align-text-bottom" />
              {formErrors.overview}
            </p>}
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
  {id == 0 ? (
    <>
              <MdAddTask className="inline-block mr-2 size-6" />
      Add Series
    </>
  ) : (
    "✏️ Edit Series"
  )}
</Button>
      </div>
      </form>
      </div>
  );
}
