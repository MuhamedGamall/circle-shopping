import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "@/types";
import toast from "react-hot-toast";

export const getAllProducts: any = createAsyncThunk(
  "productsSlice/getAllProducts",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const products = (await axios.get("/api/admin/products")).data;
      return products;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const getProduct: any = createAsyncThunk(
  "productsSlice/getProduct",
  async (product_id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const product = (await axios.get("/api/admin/products/" + product_id))
        .data;
      return product;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const unpublishProduct: any = createAsyncThunk(
  "productsSlice/unpublishProduct",
  async (params: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.patch(`/api/unpublish-product`, params)
      return params?.product_id;
    } catch (error: any) {
      toast.error("Uh oh! Something went wrong while Unpublishing the product");
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
        getAllProducts.pending,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getAllProducts.fulfilled,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(
        getAllProducts.rejected,
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
        unpublishProduct.pending,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        unpublishProduct.fulfilled,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = false;
          state.products = state.products.filter(
            (el) => el._id !== action.payload
          );
        }
      )
      .addCase(
        unpublishProduct.rejected,
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
