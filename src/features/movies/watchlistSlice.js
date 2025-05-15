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
      return mediaId; // تأكد من أن الـ API يُعيد الـ ID الصحيح
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // معالجة إضافة العناصر
      .addCase(addToWatchlistAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToWatchlistAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(addToWatchlistAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // معالجة جلب القائمة
      .addCase(fetchWatchlistAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWatchlistAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchWatchlistAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // معالجة حذف العناصر
      .addCase(removeFromWatchlistAction.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeFromWatchlistAction.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(removeFromWatchlistAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default watchlistSlice.reducer;
