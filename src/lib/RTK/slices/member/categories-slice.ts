import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Category, Product } from "@/types";
import { GroupFilters } from "../../../../types";

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
      const category = (await axios.get("/api/categories/" + category_id)).data;
      return category;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getProductsByMainCategory_member: any = createAsyncThunk(
  "memberCategoriesSlice/getProductsByMainCategory_member",
  async ({ category_id, params }: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (
        await axios.get("/api/categories/" + category_id + "/" + "products", {
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

export const getProductsBySubCategory_member: any = createAsyncThunk(
  "memberCategoriesSlice/getProductsBySubCategory_member",
  async ({ category_id, sub_category_id, params }: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (
        await axios.get(
          "/api/categories/" + sub_category_id + "/" + sub_category_id,

          { params }
        )
      ).data;
      return { data, role: params?.role };
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// for get products for one sub category
export const getSubcategoryProducts_member: any = createAsyncThunk(
  "memberCategoriesSlice/getProductsByCategory_member",
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
  productsBySubCategory: {
    products: Product[];
    groupFilters: GroupFilters | null;
  };
  productsByMainCategory: {
    products: Product[];
    groupFilters: GroupFilters | null;
  };
  productsByMainCategoryForDeals: {
    products: Product[];
    groupFilters: GroupFilters | null;
  };
  productsByMainCategoryForBestsellers: {
    products: Product[];
    groupFilters: GroupFilters | null;
  };
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
  productsBySubCategory: { products: [], groupFilters: null },
  productsByMainCategory: { products: [], groupFilters: null },
  productsByMainCategoryForDeals: { products: [], groupFilters: null },
  productsByMainCategoryForBestsellers: { products: [], groupFilters: null },
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
      state.category = null;
      state.productsByMainCategory = { products: [], groupFilters: null };
      state.productsBySubCategory = { products: [], groupFilters: null };
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
        getProductsByMainCategory_member.pending,
        (state: categoriesState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getProductsByMainCategory_member.fulfilled,
        (state: categoriesState, action: PayloadAction<any>) => {
          state.loading = false;

          action.payload?.role == "deals"
            ? (state.productsByMainCategoryForDeals = action.payload?.data)
            : action.payload?.role == "bestsellers"
            ? (state.productsByMainCategoryForBestsellers = action.payload?.data)
            : (state.productsByMainCategory = action.payload?.data);
            console.log(
              state.productsByMainCategoryForBestsellers,state.productsByMainCategoryForDeals 
            );
            
        }
      )
      .addCase(
        getProductsByMainCategory_member.rejected,
        (state: categoriesState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        getProductsBySubCategory_member.pending,
        (state: categoriesState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getProductsBySubCategory_member.fulfilled,
        (state: categoriesState, action: PayloadAction<any>) => {
          state.loading = false;
          state.productsBySubCategory = action.payload;
        }
      )
      .addCase(
        getProductsBySubCategory_member.rejected,
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
