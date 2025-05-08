import { useSelector } from "react-redux";

export function Home() {
  const { movies, isLoading, errors } = useSelector(
    (store) => store.movieSlice
  );

  return (
    <>
      <div>
        <input type="file" />
      </div>
    </>
  );
}
