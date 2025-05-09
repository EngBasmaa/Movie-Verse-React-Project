import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addMovieAction, editMovieAction } from "../../movies/movieSlice";

export default function MovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Test
  const formValues = {
    adult: false,
    backdrop_path: "/edit.jpg",
    original_language: "edit",
    original_title: "editrial",
    overview: "lorem edit",
    popularity: 599.2458,
    poster_path: "/x.jpg",
    release_date: "2022-02-23",
    title: "edittorial",
    vote_average: 6.737,
    vote_count: 211,
    poster_url: "https://image.tmdb.org/t/p/original/x.jpg",
    backdrop_url: "https://image.tmdb.org/t/p/original/x.jpg",
    genres: ["x", "Test"],
    reviews: [],
    trailer_url: "https://www.youtube.com/watch?v=tlLsFEDHtWs",
    cast: "xsa",
    category: "edit",
    createdAt: "2025-05-08T12:08:04.261Z",
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (id == 0) {
      dispatch(addMovieAction(formValues));
      navigate("/admin");
    } else {
      dispatch(editMovieAction({ id, formValues }));
      navigate("/admin");
    }
  };
  return (
    <div>
      <button onClick={submitHandler}>{id == 0 ? "Add" : "edit"}</button>
    </div>
  );
}
