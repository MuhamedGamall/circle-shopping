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
export const getUser: any = createAsyncThunk(
  "usersSlice/getUser",
  async (user_email, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/admin/users/" + user_email)).data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

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
      .addCase(
        getUsers.pending,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getUsers.fulfilled,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addCase(
        getUsers.rejected,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        getUser.pending,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getUser.fulfilled,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(
        getUser.rejected,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
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
