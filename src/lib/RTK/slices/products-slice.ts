import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../../types";
import toast from "react-hot-toast";

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
export const deleteProduct: any = createAsyncThunk(
  "productsSlice/deleteProduct",
  async (params: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      toast.success("Product deleted successfully");
      await axios.delete(
        "/api/store/" + params?.store_id + "/products/" + params?.product_id
      );

      return params?.product_id;
    } catch (error: any) {
      toast.error("Uh oh! Something went wrong while deleting the product");
      return rejectWithValue(error.message);
    }
  }
);

// export const updateProduct: any = createAsyncThunk(
//   "productsSlice/updateProduct",
//   async (product: any, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//       const updatedProduct = (
//         await axios.patch(
//           "/api/store/" +
//             product?.store_id +
//             "/products/" +
//             product?.product_id +
//             "/publish"
//         )
//       ).data;

//       return updatedProduct;
//     } catch (error: any) {
//       toast.error("Uh oh! Something went wrong");
//       return rejectWithValue(error.message);
//     }
//   }
// );

type ProductsState = {
  products: Product[];
  product: Product | null;
  loading: boolean;
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
  reducers: {
    resetForm: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getProducts.pending,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getProducts.fulfilled,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(
        getProducts.rejected,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        getProduct.pending,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getProduct.fulfilled,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = false;
          state.product = action.payload;
        }
      )
      .addCase(
        getProduct.rejected,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        deleteProduct.pending,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        deleteProduct.fulfilled,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = false;
          state.products = state.products.filter(
            (el) => el._id !== action.payload
          );
        }
      )
      .addCase(
        deleteProduct.rejected,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

    // builder
    //   .addCase(
    //     updateProduct.pending,
    //     (state: ProductsState, action: PayloadAction<any>) => {
    //       state.loading = true;
    //       state.error = null;
    //     }
    //   )
    //   .addCase(
    //     updateProduct.fulfilled,
    //     (state: ProductsState, action: PayloadAction<any>) => {
    //       state.loading = false;

    //       state.products = state.products.map((el) =>
    //         el?._id === action.payload._id ? action.payload : el
    //       );
    //       console.log(state.products);
    //     }
    //   )
    //   .addCase(
    //     updateProduct.rejected,
    //     (state: ProductsState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.error = action.payload;
    //     }
    //   );
  },
});
export default productsSlice.reducer;

export const { resetForm } = productsSlice.actions;
