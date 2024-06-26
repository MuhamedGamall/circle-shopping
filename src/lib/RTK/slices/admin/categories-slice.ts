import { Category } from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getCategories_admin: any = createAsyncThunk(
  "categoriesSlice/getCategories_admin",
  async (searchQuery: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const query = searchQuery ? `?q=${searchQuery}` : "";
      const data = (await axios.get(`/api/admin/categories${query}`)).data;
      return data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getCategory_admin: any = createAsyncThunk(
  "categoriesSlice/getCategory_admin",
  async (_id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/admin/categories/" + _id)).data;
      return data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const createCategory: any = createAsyncThunk(
  "categoriesSlice/createCategory",
  async (item, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.post("/api/admin/categories", item)).data;
      toast.success("Category created successfully.");
      return data;
    } catch (error: any) {
      if (error?.response?.status === 409)
        toast.error("This category already exists.");
      else toast.error("Uh oh! Something went wrong");
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCategory: any = createAsyncThunk(
  "categoriesSlice/deleteCategory",
  async (_id: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.delete("/api/admin/categories?_id=" + _id);
      return _id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateCategory: any = createAsyncThunk(
  "categoriesSlice/updateCategory",
  async (params: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.patch(
        "/api/admin/categories/" + params?.category_id,
        params
      );
      toast.success("Category updated successfully");
      return params;
    } catch (error: any) {
      if (error?.response?.status === 409)
        toast.error("This category already exists.");
      else toast.error("Uh oh! Something went wrong");
      return rejectWithValue(error.message);
    }
  }
);
type CategoryState = {
  categories: Category[];
  category: null | Category;
  loading: boolean;
  error: null;
};
const initialState: CategoryState = {
  categories: [],
  category: null,
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categoriesSlice",
  initialState,
  reducers: {
    resetForm: (state) => {
      state.category = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getCategories_admin.pending,
        (state: CategoryState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getCategories_admin.fulfilled,
        (state: CategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.categories = action.payload;
        }
      )
      .addCase(
        getCategories_admin.rejected,
        (state: CategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        getCategory_admin.pending,
        (state: CategoryState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getCategory_admin.fulfilled,
        (state: CategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.category = action.payload;
        }
      )
      .addCase(
        getCategory_admin.rejected,
        (state: CategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        deleteCategory.pending,
        (state: CategoryState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        deleteCategory.fulfilled,
        (state: CategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.categories = state.categories.filter(
            (el) => el._id !== action.payload
          );
        }
      )
      .addCase(
        deleteCategory.rejected,
        (state: CategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export default categoriesSlice.reducer;
export const { resetForm } = categoriesSlice.actions;
