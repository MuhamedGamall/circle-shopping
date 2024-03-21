import { Category } from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getCategories: any = createAsyncThunk(
  "categoriesSlice/getCategories",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/admin/categories")).data;
      return data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
export const getCategory: any = createAsyncThunk(
  "categoriesSlice/getCategory",
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

// export const postCategory: any = createAsyncThunk(
//   "categoriesSlice/postCategory",
//   async (item, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//       const data = (await axios.post("/api/admin/categories", item)).data;
//       toast.success("Category added");
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

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
  async (item: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      console.log(item);
      
      await axios.patch("/api/admin/categories/" + item?.category_id, item);
      toast.success("Category updated successfully");
      return item;
    } catch (error: any) {
      toast.error("Uh oh! Something wnt worng with your request");
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
        getCategories.pending,
        (state: CategoryState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getCategories.fulfilled,
        (state: CategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.categories = action.payload;
        }
      )
      .addCase(
        getCategories.rejected,
        (state: CategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        getCategory.pending,
        (state: CategoryState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getCategory.fulfilled,
        (state: CategoryState, action: PayloadAction<any>) => {
          state.loading = false;
          state.category = action.payload;
        }
      )
      .addCase(
        getCategory.rejected,
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
