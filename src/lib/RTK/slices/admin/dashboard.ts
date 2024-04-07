import { AccountData, Product, Store } from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAdminDashboardAnalytics: any = createAsyncThunk(
  "adminDashboardSlice/getAnalytics",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/admin/dashboard/analytics")).data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

// export const getUsers_admin: any = createAsyncThunk(
//   "adminDashboardSlice/getUsers",
//   async (_, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//       const data = (await axios.get("/api/admin/dashboard/users")).data;
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error);
//     }
//   }
// );
// export const getProductsSeller_admin: any = createAsyncThunk(
//   "adminDashboardSlice/getProductsSeller",
//   async (id, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//       const data = (await axios.get("/api/admin/sellers/" + id + "/products"))
//         .data;
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error);
//     }
//   }
// );
// export const getProductSeller_admin: any = createAsyncThunk(
//   "adminDashboardSlice/getProductSeller",
//   async (params: any, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//       const data = (
//         await axios.get(
//           "/api/admin/sellers/" +
//             params?.seller_id +
//             "/products/" +
//             params?.product_id
//         )
//       ).data;
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error);
//     }
//   }
// );
// export const unpublishProduct: any = createAsyncThunk(
//   "productsSlice/unpublishProduct",
//   async (params: any, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//       await axios.patch(`/api/unpublish-product`, params);
//       return params?.product_id;
//     } catch (error: any) {
//       toast.error("Uh oh! Something went wrong while Unpublishing the product");
//       return rejectWithValue(error.message);
//     }
//   }
// );
type DashboardState = {
  analytics: {
    top_sales: Product[];
    admin_length: number | null;
    users_length: number | null;
    top_users: AccountData[];
    top_selling_by_categories: {
      category: {
        main_category: string;
        sub_category: string;
        brand: string;
        _id: string;
      };
    };
    total_sales: number | null;
    sales_count: number | null;
    top_sellers: Store[];
    top_selling_by_country: {
      _id: string;
      total_sales: number | null;
      sales_count: number | null;
    };
  } | null;
  loading: boolean;
  error: null;
};
const initialState: DashboardState = {
  analytics: {
    top_sales: [],
    admin_length: 0,
    users_length: 0,
    top_users: [],
    top_selling_by_categories: {
      category: {
        main_category: "",
        sub_category: "",
        brand: "",
        _id: "",
      },
    },
    sales_count: 0,
    total_sales: 0,
    top_sellers: [],
    top_selling_by_country: {
      _id: "",
      total_sales: 0,
      sales_count: 0,
    },
  },
  loading: false,
  error: null,
};

const adminDashboardSlice = createSlice({
  name: "adminDashboardSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAdminDashboardAnalytics.pending,
        (state: DashboardState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getAdminDashboardAnalytics.fulfilled,
        (state: DashboardState, action: PayloadAction<any>) => {
          state.loading = false;
          state.analytics = action.payload;
        }
      )
      .addCase(
        getAdminDashboardAnalytics.rejected,
        (state: DashboardState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    // builder
    //   .addCase(
    //     getProductsSeller_admin.pending,
    //     (state: DashboardState, action: PayloadAction<any>) => {
    //       state.loading = true;
    //       state.error = null;
    //     }
    //   )
    //   .addCase(
    //     getProductsSeller_admin.fulfilled,
    //     (state: DashboardState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.products = action.payload;
    //     }
    //   )
    //   .addCase(
    //     getProductsSeller_admin.rejected,
    //     (state: DashboardState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.error = action.payload;
    //     }
    //   );
    // builder
    //   .addCase(
    //     getProductSeller_admin.pending,
    //     (state: DashboardState, action: PayloadAction<any>) => {
    //       state.loading = true;
    //       state.error = null;
    //     }
    //   )
    //   .addCase(
    //     getProductSeller_admin.fulfilled,
    //     (state: DashboardState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.product = action.payload;
    //     }
    //   )
    //   .addCase(
    //     getProductSeller_admin.rejected,
    //     (state: DashboardState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.error = action.payload;
    //     }
    //   );
    // builder
    //   .addCase(
    //     unpublishProduct.pending,
    //     (state: DashboardState, action: PayloadAction<any>) => {
    //       state.loading = true;
    //       state.error = null;
    //     }
    //   )
    //   .addCase(
    //     unpublishProduct.fulfilled,
    //     (state: DashboardState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.products = state.products.filter(
    //         (el) => el._id !== action.payload
    //       );
    //     }
    //   )
    //   .addCase(
    //     unpublishProduct.rejected,
    //     (state: DashboardState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.error = action.payload;
    //     }
    //   );
  },
});
export default adminDashboardSlice.reducer;
