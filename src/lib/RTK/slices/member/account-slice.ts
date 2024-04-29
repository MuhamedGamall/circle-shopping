import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AccountData } from "../../../../types";
import toast from "react-hot-toast";

export const getAccount: any = createAsyncThunk(
  "memberAccountSlice/getAccount",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/account")).data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAccount: any = createAsyncThunk(
  "memberAccountSlice/updateAccount",
  async (values: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      (await axios.patch("/api/account", values)).data;
      toast.success("Account updated successfully");
      return values;
    } catch (error: any) {
      toast.error("Something went wrong updating account");
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAccount: any = createAsyncThunk(
  "memberAccountSlice/deleteAccount",
  async (email: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.delete("/api/account?email=" + email);
      toast.success("Account deleted successfully!");
    } catch (error: any) {
      toast.error("Something went wrong deleting account try again!");
      return rejectWithValue(error.message);
    }
  }
);
type AccountState = {
  users: AccountData[];
  account: null | AccountData;
  loading: boolean;
  error: null;
};
const initialState: AccountState = {
  users: [],
  account: null,
  loading: false,
  error: null,
};

const memberAccountSlice = createSlice({
  name: "memberAccountSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder
    //   .addCase(getAccounts.pending, (state: AccountState, action: PayloadAction<any>) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(getAccounts.fulfilled, (state: AccountState, action: PayloadAction<any>) => {
    //     state.loading = false;
    //     state.users = action.payload;
    //   })
    //   .addCase(getAccounts.rejected, (state: AccountState, action: PayloadAction<any>) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });
    builder
      .addCase(
        getAccount.pending,
        (state: AccountState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getAccount.fulfilled,
        (state: AccountState, action: PayloadAction<any>) => {
          state.loading = false;
          state.account = action.payload;
        }
      )
      .addCase(
        getAccount.rejected,
        (state: AccountState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        updateAccount.pending,
        (state: AccountState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        updateAccount.fulfilled,
        (state: AccountState, action: PayloadAction<any>) => {
          state.loading = false;
          state.account = { ...state.account, ...action.payload };
        }
      )
      .addCase(
        updateAccount.rejected,
        (state: AccountState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export default memberAccountSlice.reducer;
