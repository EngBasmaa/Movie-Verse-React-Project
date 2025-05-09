import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "../features/movies/movieSlice";
import { peopleReducer } from "../features/people/peopleSlice";

export const store = configureStore({
  reducer: {
    movieSlice: movieReducer,
    peopleSlice: peopleReducer,
  },
});
