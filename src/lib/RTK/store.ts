import { configureStore } from "@reduxjs/toolkit";
// import uploadImageSlice from "./slices/upload-image-slice";
// import categoriesSlice from "./slices/categories-slice";
import userSlice from "./slices/user-slice";
// import favoriteSlice from "./slices/favorite-slice";
// import cartSlice from "./slices/cart-slice";
// import ordersSlice from "./slices/orders-slice";
import storeSlice from './slices/store-slice';
import productsSlice from "./slices/products-slice";

const store = configureStore({
  reducer: {
    // imageURL: uploadImageSlice,
    // categories: categoriesSlice,
    products: productsSlice,
    userData: userSlice,
    stores: storeSlice,
    // favoritesData: favoriteSlice,
    // productsCart: cartSlice,
    // ordersData:ordersSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
