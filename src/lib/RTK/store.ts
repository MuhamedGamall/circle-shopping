import { configureStore } from "@reduxjs/toolkit";
import sellerStoreSlice from "./slices/seller/store-slice";
import sellerProductsSlice from "./slices/seller/products-slice";
import productsSlice from "./slices/products-slice";
import categoriesSlice from "./slices/categories-slice";
import accountSlice from "./slices/account-slice";

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    seller_products: sellerProductsSlice,
    seller_store: sellerStoreSlice,
    accountData: accountSlice,
    allProducts: productsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
