import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addSeries,
  deleteSeries,
  editSeries,
  getAllSeries,
  getSeriesById,
  searchSeries,
} from "./seriesApi";

const initialState = {
  series: [],
  selectedSeries: {},
  errors: null,
  isLoading: false,
};

// Middleware
// GET ALL SERIES
export const getAllSeriesAction = createAsyncThunk(
  "series/getAllSeriesAction",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllSeries();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// GET SERIES BY ID
export const getSeriesByIdAction = createAsyncThunk(
  "series/getSeriesByIdAction",
  async (seriesId, { rejectWithValue }) => {
    try {
      const response = await getSeriesById(seriesId);
      return response.data;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// ADD SERIES
export const addSeriesAction = createAsyncThunk(
  "series/addSeriesAction",
  async (series, { rejectWithValue }) => {
    try {
      const response = await addSeries(series);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// EDIT SERIES
export const editSeriesAction = createAsyncThunk(
  "series/editSeriesAction",
  async ({ id: seriesId, formValues: series }, { rejectWithValue }) => {
    try {
      const response = await editSeries(seriesId, series);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// DELETE SERIES
export const deleteSeriesAction = createAsyncThunk(
  "series/deleteSeriesAction",
  async (seriesId, { rejectWithValue }) => {
    try {
      const response = await deleteSeries(seriesId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// SEARCH SERIES
export const searchSeriesAction = createAsyncThunk(
  "series/searchSeriesAction",
  async (query, { rejectWithValue }) => {
    try {
      const response = await searchSeries(query);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

/* ============================SLICE============================================ */
const seriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET ALL SERIES
    builder.addCase(getAllSeriesAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllSeriesAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errors = null;
      state.series = action.payload;
    });
    builder.addCase(getAllSeriesAction.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload?.message || "Something went wrong";
    });
    
    // GET SERIES BY ID
    builder.addCase(getSeriesByIdAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSeriesByIdAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errors = null;
      state.selectedSeries = action.payload;
    });
    builder.addCase(getSeriesByIdAction.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload || "Something went wrong";
    });
    
    // ADD SERIES
    builder.addCase(addSeriesAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addSeriesAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errors = null;
      state.series.push(action.payload);
    });
    builder.addCase(addSeriesAction.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload?.message || "Something went wrong";
    });
    
    // EDIT SERIES
    builder.addCase(editSeriesAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editSeriesAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errors = null;
      const updatedSeries = action.payload;
      const index = state.series.findIndex(
        (series) => series.id === updatedSeries.id
      );
      if (index !== -1) {
        state.series[index] = updatedSeries;
      }
    });
    builder.addCase(editSeriesAction.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload?.message || "Something went wrong";
    });
    
    // DELETE SERIES
    builder.addCase(deleteSeriesAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteSeriesAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errors = null;
      state.series = state.series.filter(
        (series) => series.id != action.payload.id
      );
    });
    builder.addCase(deleteSeriesAction.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload?.message || "Something went wrong";
    });
    
    // SEARCH SERIES
    builder.addCase(searchSeriesAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchSeriesAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errors = null;
      state.series = action.payload;
    });
    builder.addCase(searchSeriesAction.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = action.payload?.message || "Something went wrong";
    });
  },
});

export const seriesReducer = seriesSlice.reducer;