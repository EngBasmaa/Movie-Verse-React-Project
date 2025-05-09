import { useDispatch, useSelector } from "react-redux";
import { deleteMovieAction } from "../../movies/movieSlice";
import { useEffect } from "react";
import { Table } from "../components/Table";

export function AdminLayout() {
  const { movies, isLoading, errors } = useSelector(
    (store) => store.movieSlice
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deleteMovieAction());
  }, []);
  const deleteHandler = (movieId) => {
    dispatch(deleteMovieAction(movieId));
  };
  console.log(movies, isLoading, errors);

  return (
    <>
      <div>
        <button onClick={() => deleteHandler(986056)}>Delete</button>
      <Table />
      </div>
    </>
  );
}
