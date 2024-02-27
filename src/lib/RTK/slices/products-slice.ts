import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../../types";

export const getProducts: any = createAsyncThunk(
  "productsSlice/getProducts",
  async (store_id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const products = (await axios.get("/api/store/" + store_id + "/products"))
        .data;
      return products;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const getProduct: any = createAsyncThunk(
  "productsSlice/getProduct",
  async (data: { store_id: string; product_id: string }, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const product = (
        await axios.get(
          "/api/store/" + data?.store_id + "/products/" + data?.product_id
        )
      ).data;
      return product;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// export const postProduct: any = createAsyncThunk(
//   "productsSlice/postProduct",
//   async (item, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//       const data = (await axios.post("/api/admin/menu-products", item)).data;
//       toast.success("Product added");

//       return data;
//     } catch (error: any) {
//       toast.error("Somethig went wrong try again");
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteProduct: any = createAsyncThunk(
//   "productsSlice/deleteProduct",
//   async (_ids, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//       await axios.delete("/api/admin/menu-products?_ids=" + _ids);
//       toast.success("Product deleted");

//       return _ids;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteAllProducts: any = createAsyncThunk(
//   "productsSlice/deleteAllProducts",
//   async (_, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//       await axios.delete("/api/admin/menu-products");
//       toast.success("All products is deleted");
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const editProduct: any = createAsyncThunk(
//   "productsSlice/editProduct",
//   async (item: any, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//       await axios.patch(
//         "/api/admin/menu-products/edit-product/" + item._id,
//         item
//       );

//       toast.success("Product updated");
//       return item;
//     } catch (error: any) {
//       toast.error("Something wnt worng try again");
//       return rejectWithValue(error.message);
//     }
//   }
// );
type ProductsState = {
  products: Product[];
  product: Product | null;
  loading: false;
  error: null;
};
const initialState: ProductsState = {
  products: [],
  product: null,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getProducts.pending,
        (state: any, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getProducts.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(
        getProducts.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(getProduct.pending, (state: any, action: PayloadAction<any>) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProduct.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.product = action.payload;
        }
      )
      .addCase(
        getProduct.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    // builder
    //   .addCase(
    //     postProduct.pending,
    //     (state: AppProductState, action: PayloadAction<any>) => {
    //       state.loading = true;
    //       state.error = null;
    //     }
    //   )
    //   .addCase(
    //     postProduct.fulfilled,
    //     (state: AppProductState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.products.push(action.payload);
    //     }
    //   )
    //   .addCase(
    //     postProduct.rejected,
    //     (state: AppProductState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.error = action.payload;
    //     }
    //   );
    // builder
    //   .addCase(
    //     deleteProduct.pending,
    //     (state: AppProductState, action: PayloadAction<any>) => {
    //       state.loading = true;
    //       state.error = null;
    //     }
    //   )
    //   .addCase(
    //     deleteProduct.fulfilled,
    //     (state: AppProductState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.products = state.products.filter(
    //         (el) => !action.payload.some((xl: string) => el._id === xl)
    //       );
    //     }
    //   )
    //   .addCase(
    //     deleteProduct.rejected,
    //     (state: AppProductState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.error = action.payload;
    //     }
    //   );
    // builder
    //   .addCase(
    //     deleteAllProducts.pending,
    //     (state: AppProductState, action: PayloadAction<any>) => {
    //       state.loading = true;
    //       state.error = null;
    //     }
    //   )
    //   .addCase(
    //     deleteAllProducts.fulfilled,
    //     (state: AppProductState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.products = [];
    //     }
    //   )
    //   .addCase(
    //     deleteAllProducts.rejected,
    //     (state: AppProductState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.error = action.payload;
    //     }
    //   );
    // builder
    //   .addCase(
    //     editProduct.pending,
    //     (state: AppProductState, action: PayloadAction<any>) => {
    //       state.loading = true;
    //       state.error = null;
    //     }
    //   )
    //   .addCase(
    //     editProduct.fulfilled,
    //     (state: AppProductState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.products = state.products.map((el) =>
    //         el?._id === action.payload?._id
    //           ? {
    //               ...state.products,
    //               ...{
    //                 ...action.payload,
    //                 createdAt: el.createdAt,
    //                 updatedAt: el.updatedAt,
    //               },
    //             }
    //           : el
    //       );
    //     }
    //   )
    //   .addCase(
    //     editProduct.rejected,
    //     (state: AppProductState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.error = action.payload;
    //     }
    //   );
  },
});
export default productsSlice.reducer;
