import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../../../../types";
import toast from "react-hot-toast";

export const createProduct_seller: any = createAsyncThunk(
  "sellerProductsSlice/createProduct",
  async (params: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (
        await axios.post(
          "/api/store/" + params?.store_id + "/products",
          params?.data
        )
      ).data;
      toast.success("Product created successfully");
      return data?._id;
    } catch (error: any) {
      toast.error("Uh oh! Something went wrong");
      return rejectWithValue(error.message);
    }
  }
);
export const getProducts_seller: any = createAsyncThunk(
  "sellerProductsSlice/getProducts",
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
export const getProduct_seller: any = createAsyncThunk(
  "sellerProductsSlice/getProduct",
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
export const deleteProduct_seller: any = createAsyncThunk(
  "sellerProductsSlice/deleteProduct",
  async (params: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.delete(
        "/api/store/" +
          params?.store_id +
          "/products?product_id=" +
          params?.product_id
      );
      toast.success("Product deleted successfully");
      return params?.product_id;
    } catch (error: any) {
      toast.error("Uh oh! Something went wrong while deleting the product");
      return rejectWithValue(error.message);
    }
  }
);
export const updateProduct_seller: any = createAsyncThunk(
  "sellerProductsSlice/updateProduct",
  async (params: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      await axios.patch(
        "/api/store/" + params?.store_id + "/products/" + params?.product_id,
        params?.data
      );
      toast.success("Product Updated successfully");
    } catch (error: any) {
      toast.error("Uh oh! Something went wrong with updating the product.");
      return rejectWithValue(error.message);
    }
  }
);
export const updateProductImages_seller: any = createAsyncThunk(
  "sellerProductsSlice/updateProductImages",
  async (params: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.patch(
        "/api/store/" +
          params?.store_id +
          "/products/" +
          params?.product_id +
          "/image",
        params?.data
      );
      toast.success("Product Updated successfully");
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const deleteProductImages_seller: any = createAsyncThunk(
  "sellerProductsSlice/deleteProductImages",
  async (params: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.delete(
        `/api/store/${params?.store_id}/products/${params?.product_id}/image?ids=${params?.idsForDeleteFromCloudinary}`
      );
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const unpublishProduct: any = createAsyncThunk(
  "productsSlice/unpublishProduct",
  async (params: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.patch(`/api/unpublish-product`, params);
      return params?.product_id;
    } catch (error: any) {
      toast.error("Uh oh! Something went wrong while Unpublishing the product");
      return rejectWithValue(error.message);
    }
  }
);

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

const sellerProductsSlice = createSlice({
  name: "sellerProductsSlice",
  initialState,
  reducers: {
    resetForm: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getProducts_seller.pending,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getProducts_seller.fulfilled,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(
        getProducts_seller.rejected,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        getProduct_seller.pending,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getProduct_seller.fulfilled,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = false;
          state.product = action.payload;
        }
      )
      .addCase(
        getProduct_seller.rejected,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        deleteProduct_seller.pending,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        deleteProduct_seller.fulfilled,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = false;
          state.products = state.products.filter(
            (el) => el._id !== action.payload
          );
        }
      )
      .addCase(
        deleteProduct_seller.rejected,
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
  },
});
export default sellerProductsSlice.reducer;

export const { resetForm } = sellerProductsSlice.actions;
