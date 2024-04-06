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
  analytics: any;
  loading: boolean;
  error: null;
};
const initialState: DashboardState = {
  analytics: {} || null,
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
