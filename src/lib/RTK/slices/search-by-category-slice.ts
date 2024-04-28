import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Category, Product } from "@/types";

export const getSubCategories: any = createAsyncThunk(
  "searchByCategory/getSubCategories",
  async (main_category_id: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const categories = (
        await axios.get(
          "/api/category/" +
            main_category_id?.replaceAll("-", "%20") +
            "/" +
            "sub-categories"
        )
      ).data;
      return categories;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const getProductsBestSellers: any = createAsyncThunk(
  "searchByCategory/getProductsBestSellers",
  async (main_category_id: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const categories = (
        await axios.get(
          "/api/category/" +
            main_category_id?.replaceAll("-", "%20") +
            "/" +
            "best-sellers"
        )
      ).data;
      return categories;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

type SearchByCategoryState = {
  bestSellers: Product[];
  subCategories: Category | null;
  loading: boolean;
  error: null;
};
const initialState: SearchByCategoryState = {
  bestSellers: [],
  subCategories: null,
  loading: false,
  error: null,
};

const searchByCategory = createSlice({
  name: "searchByCategory",
  initialState,
  reducers: {
    cleanUp: (state) => {
      state.subCategories = null;
      state.bestSellers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getSubCategories.pending,
        (state: SearchByCategoryState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getSubCategories.fulfilled,
        (state: SearchByCategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.subCategories = action.payload;
        }
      )
      .addCase(
        getSubCategories.rejected,
        (state: SearchByCategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
      builder
      .addCase(
        getProductsBestSellers.pending,
        (state: SearchByCategoryState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getProductsBestSellers.fulfilled,
        (state: SearchByCategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.bestSellers = action.payload;
        }
      )
      .addCase(
        getProductsBestSellers.rejected,
        (state: SearchByCategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export default searchByCategory.reducer;
export const { cleanUp } = searchByCategory.actions;
