import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AccountData } from "@/types";
import toast from "react-hot-toast";

export const getUsers_admin: any = createAsyncThunk(
  "adminUsersSlice/getUsers_admin",
  async (searchQuery: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const query = searchQuery ? `?q=${searchQuery}` : "";

      const data = (await axios.get("/api/admin/users" + query)).data;
      return data || [];
    } catch (error: any) {
      console.log(error);

      return rejectWithValue(error.message);
    }
  }
);
export const getUser_admin: any = createAsyncThunk(
  "adminUsersSlice/getUser_admin",
  async (user_id, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/admin/users/" + user_id)).data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


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

const adminUsersSlice = createSlice({
  name: "adminUsersSlice",
  initialState,
  reducers: {
    handleUserAdmin: (state: UserState, action: PayloadAction<any>) => {
      state.users = state.users?.map((user) =>
        user?._id === action.payload?._id
          ? {
              ...user,
              admin: action.payload?.isAdmin,
            }
          : user
      );

    },
    handleUserBan: (state: UserState, action: PayloadAction<any>) => {
      state.users = state.users?.map((user) =>
        user?._id === action.payload?._id
          ? {
              ...user,
              ban: { is_banned: action.payload?.isBanned, reason: "" },
            }
          : user
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        getUsers_admin.pending,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getUsers_admin.fulfilled,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addCase(
        getUsers_admin.rejected,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        getUser_admin.pending,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getUser_admin.fulfilled,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = false;
          state.user = action.payload;
        }
      )
      .addCase(
        getUser_admin.rejected,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

  },
});
export default adminUsersSlice.reducer;
export const { handleUserBan, handleUserAdmin } = adminUsersSlice.actions;
