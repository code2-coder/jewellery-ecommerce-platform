import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// GET /api/auth/wishlist → returns populated product objects
export const fetchWishlist = createAsyncThunk(
    "wishlist/fetchWishlist",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/auth/wishlist");
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// POST /api/auth/wishlist/toggle → returns raw ID array
export const toggleWishlistItem = createAsyncThunk(
    "wishlist/toggleWishlistItem",
    async (productId, { dispatch, rejectWithValue }) => {
        try {
            await api.post("/auth/wishlist/toggle", { productId });
            // Re-fetch the full populated wishlist so both IDs and items are in sync
            const { data } = await api.get("/auth/wishlist");
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

const initialState = {
    wishlistItems: [],
    wishlistIds: [],
    loading: false,
    error: null,
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        clearWishlist: (state) => {
            state.wishlistItems = [];
            state.wishlistIds = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                const items = Array.isArray(action.payload) ? action.payload : [];
                state.wishlistItems = items;
                state.wishlistIds = items.map(p => String(p._id));
                state.error = null;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(toggleWishlistItem.fulfilled, (state, action) => {
                const items = Array.isArray(action.payload) ? action.payload : [];
                state.wishlistItems = items;
                state.wishlistIds = items.map(p => String(p._id));
                state.error = null;
            })
            .addCase(toggleWishlistItem.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
