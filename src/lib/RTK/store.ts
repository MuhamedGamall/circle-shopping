import { configureStore } from "@reduxjs/toolkit";
import sellerStoreSlice from "./slices/seller/store";
import sellerProductsSlice from "./slices/seller/products";
import productsSlice from "./slices/admin/products-slice";
import adminCategoriesSlice from "./slices/admin/categories-slice";
import memberAccountSlice from "./slices/member/account-slice";
import adminUsersSlice from "./slices/admin/users";
import adminSellerSlice from "./slices/admin/sellers";
import adminDashboardSlice from "./slices/admin/dashboard";
import memberCategoriesSlice from './slices/member/categories-slice';

const store = configureStore({
  reducer: {
    seller_products: sellerProductsSlice,
    seller_store: sellerStoreSlice,
    admin_categories: adminCategoriesSlice,
    admin_products: productsSlice,
    admin_users: adminUsersSlice,
    admin_sellers: adminSellerSlice,
    admin_dashboard: adminDashboardSlice,
    member_accountData: memberAccountSlice,
    member_categories: memberCategoriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
