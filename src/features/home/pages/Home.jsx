import { useSelector } from "react-redux";
import { searchMovies } from "../../movies/movieApi";

export function Home() {
  const { movies, isLoading, errors } = useSelector(
    (store) => store.movieSlice
  );
  let search = (e) => {
    let { value } = e.target;
    searchMovies(value).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <>
      <div>
        <input type="text" onChange={(e) => search(e)} />
      </div>
    </>
  );
}
