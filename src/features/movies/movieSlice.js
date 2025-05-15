import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addMovie,
  deleteMovie,
  editMovie,
  getAllMovies,
  getMovieById,
} from "./movieApi";

const initialState = {
  movies: [],
  selectedMovie: {},
  errors: null,
  isLoading: false,
};

// Middleware
// GET ALL MOVIES
export const getAllMoviesAction = createAsyncThunk(
  "movie/getAllMoviesAction",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllMovies();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);
export const getMovieByIdAction = createAsyncThunk(
  "movie/getMovieByIdAction",
  async (movieId, { rejectWithValue, getState }) => {
    try {
      // 1. حاول البحث في الأفلام أولاً
      const response = await getMovieById(movieId);
      return response.data;
    } catch (error) {
      // 2. إذا فشل، ابحث في known_for للممثلين
      const state = getState();
      const people = state.peopleSlice.people;

      const foundInPeople = people
        .flatMap((person) => person.known_for)
        .find((movie) => movie?.id == movieId);

      if (foundInPeople) {
        return foundInPeople; // إرجاع الفيلم من بيانات الممثلين
      }

      // 3. إذا لم يُوجد في أي مكان
      return rejectWithValue({
        message: `Movie ${movieId} not found in any source`,
      });
    }
  }
);
// ADD MOVIE
export const addMovieAction = createAsyncThunk(
  "movie/addMovieAction",
  async (movie, { rejectWithValue }) => {
    try {
      const response = await addMovie(movie);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);
// EDIT MOVIE
export const editMovieAction = createAsyncThunk(
  "movie/editMovieAction",
  async ({ id: movieId, formValues: movie }, { rejectWithValue }) => {
    try {
      const response = await editMovie(movieId, movie);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);
// DELETE MOVIE
export const deleteMovieAction = createAsyncThunk(
  "movie/deleteMovieAction",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await deleteMovie(movieId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

/* ============================SLICE============================================ */
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL MOVIES
    builder.addCase(getAllMoviesAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllMoviesAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errors = null;
      state.movies = action.payload;
    });
    builder.addCase(getAllMoviesAction.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload?.message || "Something went wrong";
    });
    // GET MOVIE BY ID
    builder.addCase(getMovieByIdAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMovieByIdAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errors = null;
      state.selectedMovie = action.payload;
    });
    builder.addCase(getMovieByIdAction.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload || "Something went wrong";
    });
    // ADD MOVIE
    builder.addCase(addMovieAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addMovieAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errors = null;
      state.movies.push(action.payload);
    });
    builder.addCase(addMovieAction.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload?.message || "Something went wrong";
    });
    // EDIT MOVIE
    builder.addCase(editMovieAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editMovieAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errors = null;
      const updatedMovie = action.payload;
      const index = state.movies.findIndex(
        (movie) => movie.id === updatedMovie.id
      );
      if (index !== -1) {
        state.movies[index] = updatedMovie;
      }
    });
    builder.addCase(editMovieAction.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload?.message || "Something went wrong";
    });
    // DELETE MOVIE
    builder.addCase(deleteMovieAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteMovieAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errors = null;
      state.movies = state.movies.filter(
        (movie) => movie.id != action.payload.id
      );
    });
    builder.addCase(deleteMovieAction.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload?.message || "Something went wrong";
    });
  },
});

export const movieReducer = movieSlice.reducer;
