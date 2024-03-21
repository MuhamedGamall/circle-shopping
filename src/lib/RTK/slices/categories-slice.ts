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
      return _id
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


// export const editCategory: any = createAsyncThunk(
//   "categoriesSlice/editCategory",
//   async (item: FormCategoryValues, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//       await axios.put("/api/admin/categories", item);
//       toast.success("Category updated");
//       return item;
//     } catch (error: any) {
//       toast.error("Something wnt worng try again");
//       return rejectWithValue(error.message);
//     }
//   }
// );
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
  reducers: {},
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
    // builder
    //   .addCase(
    //     postCategory.pending,
    //     (state: CategoryState, action: PayloadAction<any>) => {
    //       state.loading = true;
    //       state.error = null;
    //     }
    //   )
    //   .addCase(
    //     postCategory.fulfilled,
    //     (state: CategoryState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.categories.push(action.payload);
    //     }
    //   )
    //   .addCase(
    //     postCategory.rejected,
    //     (state: CategoryState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.error = action.payload;
    //     }
    //   );
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
    // builder
    //   .addCase(
    //     deleteAllCategories.pending,
    //     (state: CategoryState, action: PayloadAction<any>) => {
    //       state.loading = true;
    //       state.error = null;
    //     }
    //   )
    //   .addCase(
    //     deleteAllCategories.fulfilled,
    //     (state: CategoryState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.categories = [];
    //     }
    //   )
    //   .addCase(
    //     deleteAllCategories.rejected,
    //     (state: CategoryState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.error = action.payload;
    //     }
    //   );
    // builder
    //   .addCase(
    //     editCategory.pending,
    //     (state: CategoryState, action: PayloadAction<any>) => {
    //       state.loading = true;
    //       state.error = null;
    //     }
    //   )
    //   .addCase(
    //     editCategory.fulfilled,
    //     (state: CategoryState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.categories = state.categories.map((el) =>
    //         el?._id === action.payload?._id
    //           ? { ...state.categories, ...action.payload }
    //           : el
    //       );
    //     }
    //   )
    //   .addCase(
    //     editCategory.rejected,
    //     (state: CategoryState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.error = action.payload;
    //     }
    //   );
  },
});
export default categoriesSlice.reducer;
