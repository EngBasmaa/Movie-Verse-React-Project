import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesAction } from "../../movies/movieSlice";

export function Home() {
  const { movies, isLoading, errors } = useSelector(
    (store) => store.movieSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllMoviesAction());
  }, []);
  console.log(movies, isLoading, errors);
  return (
    <>
      <div>
        <input type="file" />
      </div>
    </>
  );
}
