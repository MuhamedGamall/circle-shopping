import { Product } from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { GroupFilters } from "../../../../types";

export const getProducts_member: any = createAsyncThunk(
  "memberProductsSlice/getProducts_member",
  async (params: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (
        await axios.get("/api/products/", {
          params,
        })
      ).data;

      return { data, role: params?.role };
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);


type ProductsState = {

  products: {
    products: Product[];
    groupFilters: GroupFilters | null;
  };
  productsByMainCategoryForDealsSlider: {
    products: Product[];
  };
  productsByMainCategoryForBestsellersSlider: {
    products: Product[];
  };
  loading: boolean;
  error: null;
};
const initialState: ProductsState = {

  products: { products: [], groupFilters: null },
  productsByMainCategoryForDealsSlider: { products: [] },
  productsByMainCategoryForBestsellersSlider: {
    products: [],
  },
  loading: false,
  error: null,
};

const memberProductsSlice = createSlice({
  name: "memberProductsSlice",
  initialState,
  reducers: {
    cleanUp: (state) => {
      state.products = { products: [], groupFilters: null };
    },
  },
  extraReducers: (builder) => {

    builder
      .addCase(
        getProducts_member.pending,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(getProducts_member.fulfilled, (state, action) => {
        state.loading = false;
        const { role, data } = action.payload;
        if (role === "deals") {
          state.productsByMainCategoryForDealsSlider = data;
        } else if (role === "bestsellers") {
          state.productsByMainCategoryForBestsellersSlider = data;
        }
        state.products = data;
      })
      .addCase(
        getProducts_member.rejected,
        (state: ProductsState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

  },
});
export default memberProductsSlice.reducer;
export const { cleanUp } = memberProductsSlice.actions;
