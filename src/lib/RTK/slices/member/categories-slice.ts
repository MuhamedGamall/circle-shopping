import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Category, Product } from "@/types";

export const getCategories_member: any = createAsyncThunk(
  "memberCategoriesSlice/getCategories_member",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const categories = (await axios.get("/api/categories")).data;
      return categories;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const getCategory_member: any = createAsyncThunk(
  "memberCategoriesSlice/getCategory_member",
  async (category_id: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const category = (
        await axios.get(
          "/api/categories/" + category_id?.replaceAll("-", "%20")
        )
      ).data;
      return category;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getProductsBestSellers: any = createAsyncThunk(
  "memberCategoriesSlice/getProductsBestSellers",
  async ({ category_id, params }: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const categories = (
        await axios.get(
          "/api/categories/" +
            category_id?.replaceAll("-", "%20") +
            "/" +
            "best-sellers",
          { params }
        )
      ).data;
      return categories;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

type categoriesState = {
  bestSellers: Product[];
  categories: Category[];
  category: Category | null;
  loading: boolean;
  error: null;
};
const initialState: categoriesState = {
  bestSellers: [],
  categories: [],
  category: null,
  loading: false,
  error: null,
};

const memberCategoriesSlice = createSlice({
  name: "memberCategoriesSlice",
  initialState,
  reducers: {
    cleanUp: (state) => {
      state.category = null;
      state.bestSellers = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getCategories_member.pending,
        (state: categoriesState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getCategories_member.fulfilled,
        (state: categoriesState, action: PayloadAction<any>) => {
          state.loading = false;
          state.categories = action.payload;
        }
      )
      .addCase(
        getCategories_member.rejected,
        (state: categoriesState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        getCategory_member.pending,
        (state: categoriesState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getCategory_member.fulfilled,
        (state: categoriesState, action: PayloadAction<any>) => {
          state.loading = false;
          state.category = action.payload;
        }
      )
      .addCase(
        getCategory_member.rejected,
        (state: categoriesState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        getProductsBestSellers.pending,
        (state: categoriesState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getProductsBestSellers.fulfilled,
        (state: categoriesState, action: PayloadAction<any>) => {
          state.loading = false;
          state.bestSellers = action.payload;
        }
      )
      .addCase(
        getProductsBestSellers.rejected,
        (state: categoriesState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export default memberCategoriesSlice.reducer;
export const { cleanUp } = memberCategoriesSlice.actions;
