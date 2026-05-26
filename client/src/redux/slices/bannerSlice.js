import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchActiveBanners = createAsyncThunk(
  "banner/fetchActiveBanners",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/banners");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchAllBanners = createAsyncThunk(
  "banner/fetchAllBanners",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/banners/admin");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getBannerDetails = createAsyncThunk(
  "banner/getBannerDetails",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/banners/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createBanner = createAsyncThunk(
  "banner/createBanner",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/banners", {});
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateBanner = createAsyncThunk(
  "banner/updateBanner",
  async (banner, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/banners/${banner._id}`, banner);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteBanner = createAsyncThunk(
  "banner/deleteBanner",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/banners/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const initialState = {
  banners: [],
  banner: null,
  loading: false,
  error: null,
  successCreate: false,
  successUpdate: false,
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    resetBannerState: (state) => {
      state.successCreate = false;
      state.successUpdate = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Active Banners
      .addCase(fetchActiveBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActiveBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
        state.error = null;
      })
      .addCase(fetchActiveBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch All Banners
      .addCase(fetchAllBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
        state.error = null;
      })
      .addCase(fetchAllBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Banner
      .addCase(createBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.successCreate = true;
        state.banner = action.payload;
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Banner
      .addCase(updateBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBanner.fulfilled, (state) => {
        state.loading = false;
        state.successUpdate = true;
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Get Banner Details
      .addCase(getBannerDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBannerDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.banner = action.payload;
      })
      .addCase(getBannerDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBannerState } = bannerSlice.actions;

export default bannerSlice.reducer;
