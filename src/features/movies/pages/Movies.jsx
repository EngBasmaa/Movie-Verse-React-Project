import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesAction } from "../movieSlice";

export function Movies() {
  const { movies, isLoading, errors } = useSelector(
    (store) => store.movieSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMoviesAction());
  }, []);
  console.log(movies, isLoading, errors);
  // UI
  if (isLoading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  if (errors) {
    return (
      <div>
        <h1>Error {errors}</h1>
      </div>
    );
  }
  return (
    <>
      <div>
        <h1>Movies Page</h1>
        <p>TEST</p>
      </div>
    </>
  );
}
