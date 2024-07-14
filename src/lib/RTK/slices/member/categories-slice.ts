import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Category, Product } from "@/types";

export const getCategories_member: any = createAsyncThunk(
  "memberCategoriesSlice/getCategories_member",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/categories`;

      const req = await fetch(url, { cache: "force-cache" });
      const data = await req.json();

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const getCategory_member: any = createAsyncThunk(
  "memberCategoriesSlice/getCategory_member",
  async (category_id: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;

    try {
      const category = (await axios.get("/api/categories/" + category_id)).data;
      return category;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// for get products for one sub category
export const getSubcategoryProducts_member: any = createAsyncThunk(
  "memberCategoriesSlice/getSubcategoryProducts_member",
  async (category_id: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const categories = (
        await axios.get(
          "/api/categories/" + category_id + "/" + "subcategory-products"
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
  categories: Category[];
  category: Category | null;
  subcategoryProducts: {
    _id: { main_category: string; sub_category: string };
    products: Product[];
  }[];
  loading: boolean;
  error: null;
};
const initialState: categoriesState = {
  categories: [],
  subcategoryProducts: [],
  category: null,
  loading: false,
  error: null,
};

const memberCategoriesSlice = createSlice({
  name: "memberCategoriesSlice",
  initialState,
  reducers: {
    cleanUp: (state) => {
      // state.category = null;
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
        getSubcategoryProducts_member.pending,
        (state: categoriesState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getSubcategoryProducts_member.fulfilled,
        (state: categoriesState, action: PayloadAction<any>) => {
          state.loading = false;
          state.subcategoryProducts = action.payload;
        }
      )
      .addCase(
        getSubcategoryProducts_member.rejected,
        (state: categoriesState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export default memberCategoriesSlice.reducer;
export const { cleanUp } = memberCategoriesSlice.actions;
