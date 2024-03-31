import { configureStore } from "@reduxjs/toolkit";
import sellerStoreSlice from "./slices/seller/store";
import sellerProductsSlice from "./slices/seller/products";
import productsSlice from "./slices/products-slice";
import categoriesSlice from "./slices/categories-slice";
import accountSlice from "./slices/account-slice";
import usersSlice from "./slices/admin/users";
import adminSellerSlice from "./slices/admin/sellers";

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    seller_products: sellerProductsSlice,
    seller_store: sellerStoreSlice,
    accountData: accountSlice,
    allProducts: productsSlice,
    users: usersSlice,
    sellers: adminSellerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
