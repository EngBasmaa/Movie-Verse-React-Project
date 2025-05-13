import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSeriesByIdAction } from "../seriesSlice";

export function SeriesDetails() {
  const { id } = useParams();
  const { selectedSeries, isLoading, errors } = useSelector(
    (store) => store.seriesSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSeriesByIdAction(id));
  }, [id]);

  console.log(selectedSeries);

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
      <h1>Series Details</h1>
      <p>test</p>
    </div>
  );
}
