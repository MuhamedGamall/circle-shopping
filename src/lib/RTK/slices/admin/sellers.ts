import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product, Store } from "../../../../types";
import toast from "react-hot-toast";

export const getSellers_admin: any = createAsyncThunk(
  "adminSellersSlice/getSellers",
  async (searchQuery: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const query = searchQuery ? `?q=${searchQuery}` : "";
      const data = (await axios.get("/api/admin/sellers" + query)).data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getSeller_admin: any = createAsyncThunk(
  "adminSellersSlice/getSeller",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/admin/sellers/" + id)).data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const getProductsSeller_admin: any = createAsyncThunk(
  "adminSellersSlice/getProductsSeller",
  async ({ seller_id, searchQuery }: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const query = searchQuery ? `?q=${searchQuery}` : "";

      const data = (
        await axios.get("/api/admin/sellers/" + seller_id + "/products" + query)
      ).data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const getProductSeller_admin: any = createAsyncThunk(
  "adminSellersSlice/getProductSeller",
  async (params: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (
        await axios.get(
          "/api/admin/sellers/" +
            params?.seller_id +
            "/products/" +
            params?.product_id
        )
      ).data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
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
type SellerState = {
  sellers: Store[];
  seller: null | Store;
  products: Product[];
  product: Product | null;
  loading: boolean;
  error: null;
};
const initialState: SellerState = {
  sellers: [],
  products: [],
  product: null,
  seller: null,
  loading: false,
  error: null,
};

const adminSellersSlice = createSlice({
  name: "adminSellersSlice",
  initialState,
  reducers: {
    handleSellerBan: (state: SellerState, action: PayloadAction<any>) => {
      state.sellers = state.sellers?.map((seller) =>
        seller?._id === action.payload?._id
          ? {
              ...seller,
              ban: { is_banned: action.payload?.isBanned, reason: "" },
            }
          : seller
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getSellers_admin.pending,
        (state: SellerState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getSellers_admin.fulfilled,
        (state: SellerState, action: PayloadAction<any>) => {
          state.loading = false;
          state.sellers = action.payload;
        }
      )
      .addCase(
        getSellers_admin.rejected,
        (state: SellerState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        getSeller_admin.pending,
        (state: SellerState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getSeller_admin.fulfilled,
        (state: SellerState, action: PayloadAction<any>) => {
          state.loading = false;
          state.seller = action.payload;
        }
      )
      .addCase(
        getSeller_admin.rejected,
        (state: SellerState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        getProductsSeller_admin.pending,
        (state: SellerState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getProductsSeller_admin.fulfilled,
        (state: SellerState, action: PayloadAction<any>) => {
          state.loading = false;
          state.products = action.payload;
        }
      )
      .addCase(
        getProductsSeller_admin.rejected,
        (state: SellerState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        getProductSeller_admin.pending,
        (state: SellerState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getProductSeller_admin.fulfilled,
        (state: SellerState, action: PayloadAction<any>) => {
          state.loading = false;
          state.product = action.payload;
        }
      )
      .addCase(
        getProductSeller_admin.rejected,
        (state: SellerState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        unpublishProduct.pending,
        (state: SellerState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        unpublishProduct.fulfilled,
        (state: SellerState, action: PayloadAction<any>) => {
          state.loading = false;
          state.products = state.products.filter(
            (el) => el._id !== action.payload
          );
        }
      )
      .addCase(
        unpublishProduct.rejected,
        (state: SellerState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export default adminSellersSlice.reducer;
export const { handleSellerBan } =adminSellersSlice.actions;
