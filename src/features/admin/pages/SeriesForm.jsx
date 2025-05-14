import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { MdAddTask } from "react-icons/md";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { getSeriesById } from "../../series/seriesApi";
import { useDispatch } from "react-redux";
import { addSeriesAction, editSeriesAction } from "../../series/seriesSlice";
import { v4 as uuidv4 } from "uuid";

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
    reviews: "[]",
    adult: false,
    trailer_url: "",
    cast: "",
    category: "general",
    number_of_episodes: "",
    number_of_seasons: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    if (id !== "0") {
      getSeriesById(id).then((response) => {
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
          error = "هذا الحقل مطلوب";
        } else if (value.trim().length < 3) {
          error = "يجب أن يحتوي على الأقل على 3 أحرف";
        }
        break;

      case "poster_url":
      case "backdrop_url":
      case "trailer_url":
        if (!value.trim()) {
          error = "هذا الحقل مطلوب";
        } else if (!urlPattern.test(value)) {
          error = "رابط غير صحيح";
        }
        break;

      case "release_date":
        if (!value) error = "must enter a release date";
        break;

      case "vote_average":
        if (isNaN(value) || parseFloat(value) < 0 || parseFloat(value) > 10)
          error = "يجب أن يكون بين 0 و 10";
        break;

      case "vote_count":
      case "popularity":
      case "number_of_seasons":
      case "number_of_episodes":
        if (isNaN(value) || parseInt(value) < 0)
          error = "must be a positive number";
        break;

      case "genres":
        if (!value.length) error = "must select at least one genre";
        break;

      case "category":
        if (!["top_rated", "popular", "upcoming"].includes(value)) {
          error = "invalid category";
        }
        break;
    }
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

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
      number_of_seasons: Number(formData.number_of_seasons),
      number_of_episodes: Number(formData.number_of_episodes),
      release_date: new Date(formData.release_date).toISOString(),
      reviews: JSON.parse(formData.reviews),
      id: id && id !== "0" ? id : uuidv4(),
    };

    const seriesAction =
      id && id !== "0"
        ? editSeriesAction({ id, formValues: formattedData })
        : addSeriesAction(formattedData);

    dispatch(seriesAction)
      .then(() => {
        navigate("/admin/series");
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
          number_of_episodes: "",
          number_of_seasons: "",
        });
      })
      .catch((err) => {
        console.error("فشلت العملية:", err);
      });
  };

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
        className={`bg-zinc-800 text-white ${
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

  const renderCategorySelect = () => (
    <div className="space-y-2">
      <Label htmlFor="category">Category</Label>
      <select
        id="category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="bg-zinc-800 text-white rounded-md px-3 py-2 w-full"
      >
        <option value="top_rated">top_rated </option>
        <option value="popular"> popular </option>
        <option value="upcoming">upcoming </option>
      </select>
    </div>
  );

  return (
    <div className="bg-zinc-800">
      <form
        onSubmit={handleSubmit}
        className="bg-red-100 border text-pink-700 border-gray-200 rounded-2xl p-8 shadow-xl w-full max-w-4xl mx-auto"
      >
        <h3 className="text-2xl font-bold text-pink-700 mb-6 text-center">
          {id === "0" ? "🎬 Add new series" : "✏️ edit series"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderInput("title", "title")}
          {renderInput("original title ", "original_title")}
          {renderInput("بوستر المسلسل", "poster_url")}
          {renderInput("خلفية المسلسل", "backdrop_url")}
          {renderInput("تاريخ الإصدار", "release_date", "date")}
          {renderInput("اللغة الأصلية", "original_language")}
          {renderInput("عدد المواسم", "number_of_seasons", "number")}
          {renderInput("عدد الحلقات", "number_of_episodes", "number")}
          {renderInput("المقطع الدعائي", "trailer_url")}
          {renderInput("طاقم التمثيل", "cast")}
          {renderCategorySelect()}

          <div className="space-y-2">
            <Label htmlFor="genres">الأنواع</Label>
            <select
              id="genres"
              name="genres"
              multiple
              value={formData.genres}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`bg-zinc-800 text-white rounded-md px-3 py-2 w-full ${
                formErrors.genres && submitAttempted ? "border-red-500" : ""
              }`}
              required
            >
              <option value="action">أكشن</option>
              <option value="comedy">كوميديا</option>
              <option value="drama">دراما</option>
              <option value="horror">رعب</option>
              <option value="romance">رومانسي</option>
            </select>
            {formErrors.genres && (
              <p className="text-sm text-red-500">
                <ExclamationTriangleIcon className="inline-block mr-1 align-text-bottom" />
                {formErrors.genres}
              </p>
            )}
          </div>

          {renderInput("التقييم العام", "vote_average", "number")}
          {renderInput("عدد التقييمات", "vote_count", "number")}
          {renderInput("الشعبية", "popularity", "number")}

          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="overview">الملخص</Label>
            <Textarea
              id="overview"
              name="overview"
              rows="4"
              value={formData.overview}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`bg-zinc-800 text-white ${
                formErrors.overview && submitAttempted ? "border-red-500" : ""
              }`}
              required
            />
            {formErrors.overview && (
              <p className="text-sm text-red-500">
                <ExclamationTriangleIcon className="inline-block mr-1 align-text-bottom" />
                {formErrors.overview}
              </p>
            )}
          </div>

          <div className="md:col-span-2 flex items-center gap-3 pt-4">
            <Switch
              checked={formData.adult}
              onCheckedChange={handleSwitch}
              id="adult"
            />
            <Label htmlFor="adult">للبالغين فقط؟</Label>
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
                إضافة مسلسل
              </>
            ) : (
              "✏️ حفظ التعديلات"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
