import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addToWatchlistAction = createAsyncThunk(
  "watchlist/add",
  async (media, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(media),
      });
      if (!response.ok) throw new Error("Failed to add to watchlist");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchWatchlistAction = createAsyncThunk(
  "watchlist/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/watchlist");
      if (!response.ok) throw new Error("Failed to fetch watchlist");
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const removeFromWatchlistAction = createAsyncThunk(
  "watchlist/remove",
  async (mediaId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:3001/watchlist/${mediaId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to remove from watchlist");
      return mediaId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWatchlistAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWatchlistAction.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addToWatchlistAction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
    builder
      .addCase(fetchWatchlistAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWatchlistAction.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchWatchlistAction.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
    builder.addCase(removeFromWatchlistAction.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    });
  },
});

export default watchlistSlice.reducer;
