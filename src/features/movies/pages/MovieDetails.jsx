import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieByIdAction } from "../movieSlice";

export function MovieDetails() {
  const { id } = useParams();
  const { selectedMovie, isLoading, errors } = useSelector(
    (store) => store.movieSlice
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieByIdAction(id));
  }, [id]);
  console.log(selectedMovie, isLoading, errors);

  // UI
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (errors) {
    return (
      <div>
        <h1>Error {errors}</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Movie Details</h1>
      <p>test</p>
    </div>
  );
}
