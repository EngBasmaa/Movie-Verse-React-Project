import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "../features/movies/movieSlice";
import { peopleReducer } from "../features/people/peopleSlice";
import { seriesReducer } from "../features/series/seriesSlice";

export const store = configureStore({
  reducer: {
    movieSlice: movieReducer,
    peopleSlice: peopleReducer,
    seriesSlice: seriesReducer,
  },
});
