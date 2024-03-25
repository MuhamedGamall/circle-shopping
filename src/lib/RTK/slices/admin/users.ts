import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AccountData } from "@/types";
import toast from "react-hot-toast";

export const getUsers: any = createAsyncThunk(
  "usersSlice/getUsers",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/admin/users")).data;
      return data || [];
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(error.message);
    }
  }
);
// export const getAccount: any = createAsyncThunk(
//   "usersSlice/getAccount",
//   async (_, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//       const data = (await axios.get("/api/account")).data;
//       return data;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const updateAccount: any = createAsyncThunk(
//   "usersSlice/updateAccount",
//   async (values: any, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//       (await axios.patch("/api/account", values)).data;
//       toast.success("Account updated successfully");
//       return values;
//     } catch (error: any) {
//       toast.error("Something went wrong updating account");
//       return rejectWithValue(error.message);
//     }
//   }
// );



type UserState = {
  users: AccountData[];
  user: null | AccountData;
  loading: boolean;
  error: null;
};
const initialState: UserState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state: UserState, action: PayloadAction<any>) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state: UserState, action: PayloadAction<any>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state: UserState, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
    // builder
    //   .addCase(
    //     getAccount.pending,
    //     (state: UserState, action: PayloadAction<any>) => {
    //       state.loading = true;
    //       state.error = null;
    //     }
    //   )
    //   .addCase(
    //     getAccount.fulfilled,
    //     (state: UserState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.account = action.payload;
    //     }
    //   )
    //   .addCase(
    //     getAccount.rejected,
    //     (state: UserState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.error = action.payload;
    //     }
    //   );
    // builder
    //   .addCase(
    //     updateAccount.pending,
    //     (state: UserState, action: PayloadAction<any>) => {
    //       state.loading = true;
    //       state.error = null;
    //     }
    //   )
    //   .addCase(
    //     updateAccount.fulfilled,
    //     (state: UserState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.account = { ...state.account, ...action.payload };
          
    //     }
    //   )
    //   .addCase(
    //     updateAccount.rejected,
    //     (state: UserState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.error = action.payload;
    //     }
    //   );
  },
});
export default usersSlice.reducer;
