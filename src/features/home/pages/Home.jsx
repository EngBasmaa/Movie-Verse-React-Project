import { useSelector } from "react-redux";
import { searchMovies } from "../../movies/movieApi";
import { Button } from "../../../shared/components/MyButton";
import { MovieCard } from "../../../shared/components/MovieCard";

export function Home() {
  const { movies, isLoading, errors } = useSelector(
    (store) => store.movieSlice
  );
  console.log("HOME", movies, isLoading, errors);
  let search = (e) => {
    let { value } = e.target;
    searchMovies(value).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <>
      <div>
        <h1>Ali</h1>
        <input type="text" onChange={(e) => search(e)} />
        <div className="flex flex-col items-center justify-center min-h-svh">
          <Button>Click me</Button>
        </div>
        {movies.map((movie) => {
          return (
            <MovieCard
              imageUrl={movie.poster_url}
              width={450}
              height={450}
              imageOnly="true"
            ></MovieCard>
          );
        })}
        <MovieCard
          imageUrl={
            "https://image.tmdb.org/t/p/original/jM2uqCZNKbiyStyzXOERpMqAbdx.jpg"
          }
          width={450}
          height={450}
          imageOnly="true"
        ></MovieCard>
      </div>
    </>
  );
}
