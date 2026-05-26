import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import bannerReducer from "./slices/bannerSlice";
import adminReducer from "./slices/adminSlice";
import wishlistReducer from "./slices/wishlistSlice";
import categoryReducer from "./slices/categorySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    banner: bannerReducer,
    admin: adminReducer,
    wishlist: wishlistReducer,
    category: categoryReducer,
  },
});

export default store;
