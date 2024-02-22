import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Store } from "../../../types";
import toast from "react-hot-toast";

// export const createStore: any = createAsyncThunk(
//   "storeSlice/createStore",
//   async (store, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//       const data = (await axios.post("/api/store", store)).data;
//       toast.success("Store created successfully");
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
export const getStore: any = createAsyncThunk(
  "storeSlice/getStore",
  async (id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/store?id=" + id)).data;
      console.log(data);
      
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

type StoreState = {
  stores: Store[];
  store: null | Store;
  loading: boolean;
  error: null;
};
const initialState: StoreState = {
  store: null,
  stores: [],
  loading: false,
  error: null,
};

const storeSlice = createSlice({
  name: "storeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder
    //   .addCase(
    //     createStore.pending,
    //     (state: StoreState, action: PayloadAction<any>) => {
    //       state.loading = true;
    //       state.error = null;
    //     }
    //   )
    //   .addCase(
    //     createStore.fulfilled,
    //     (state: StoreState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.store = action.payload;
    //     }
    //   )
    //   .addCase(
    //     createStore.rejected,
    //     (state: StoreState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.error = action.payload;
    //     }
    //   );
    builder
      .addCase(
        getStore.pending,
        (state: StoreState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getStore.fulfilled,
        (state: StoreState, action: PayloadAction<any>) => {
          state.loading = false;
          state.store = action.payload;
        }
      )
      .addCase(
        getStore.rejected,
        (state: StoreState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export default storeSlice.reducer;
