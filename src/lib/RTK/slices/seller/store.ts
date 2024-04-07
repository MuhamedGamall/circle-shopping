import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Store } from "../../../../types";
import toast from "react-hot-toast";

export const getStore_seller: any = createAsyncThunk(
  "sellerStoreSlice/getStore",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/store")).data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);
export const createStore_seller: any = createAsyncThunk(
  "sellerStoreSlice/createStore",
  async (params, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.post("/api/store", params)).data;
      toast.success("Store created successfully");
      return data;
    } catch (error: any) {
      if (error?.response?.status !== 409)
        toast.error("Uh oh! Something went wrong");

      return rejectWithValue(error);
    }
  }
);
export const updateStore_seller: any = createAsyncThunk(
  "sellerStoreSlice/updateStore",
  async (params: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.patch(`/api/store/${params?._id}`, params?.data);
      toast.success("Store updated successfully");
    } catch (error: any) {
      if (error?.response?.status !== 409)
        toast.error("Uh oh! Something went wrong");
      return rejectWithValue(error);
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
    builder
      .addCase(
        createStore_seller.pending,
        (state: StoreState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        createStore_seller.fulfilled,
        (state: StoreState, action: PayloadAction<any>) => {
          state.loading = false;
          state.store = action.payload;
        }
      )
      .addCase(
        createStore_seller.rejected,
        (state: StoreState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
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
