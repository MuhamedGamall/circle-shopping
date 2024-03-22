import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Store } from "../../../../types";

export const getStore_seller: any = createAsyncThunk(
  "sellerStoreSlice/getStore",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/store")).data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

type StoreState = {

  store: null | Store;
  loading: boolean;
  error: null;
};
const initialState: StoreState = {
  store: null,
  loading: false,
  error: null,
};

const storeSlice = createSlice({
  name: "sellerStoreSlice",
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
        getStore_seller.pending,
        (state: StoreState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getStore_seller.fulfilled,
        (state: StoreState, action: PayloadAction<any>) => {
          state.loading = false;
          state.store = action.payload;
        }
      )
      .addCase(
        getStore_seller.rejected,
        (state: StoreState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export default storeSlice.reducer;
