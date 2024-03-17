import { configureStore } from "@reduxjs/toolkit";
// import uploadImageSlice from "./slices/upload-image-slice";
// import categoriesSlice from "./slices/categories-slice";
import userSlice from "./slices/user-slices/user-slice";
// import favoriteSlice from "./slices/favorite-slice";
// import cartSlice from "./slices/cart-slice";
// import ordersSlice from "./slices/orders-slice";
import sellerStoreSlice from "./slices/seller-slices/store-slice";
import sellerProductsSlice from "./slices/seller-slices/products-slice";
import adminProductsSlice from "./slices/admin-slices/products-slice";

const store = configureStore({
  reducer: {
    // imageURL: uploadImageSlice,
    // categories: categoriesSlice,
    // seller slices
    seller_products: sellerProductsSlice,
    seller_store: sellerStoreSlice,
    //user slices
    user_userData: userSlice,
    // admin: slices,
    admin_products: adminProductsSlice,
    // favoritesData: favoriteSlice,
    // productsCart: cartSlice,
    // ordersData:ordersSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
