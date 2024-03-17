import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserData } from "../../../../types";
import toast from "react-hot-toast";

// export const getUsers: any = createAsyncThunk(
//   "userSlice/getUsers",
//   async (_, thunkApi) => {
//     const { rejectWithValue } = thunkApi;
//     try {
//       const data = (await axios.get("/api/admin/users")).data;
//       return data || [];
//     } catch (error: any) {
//       console.log(error);

//       return rejectWithValue(error.message);
//     }
//   }
// );
export const getUser_user: any = createAsyncThunk(
  "userSlice/getUser",
  async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = (await axios.get("/api/profile")).data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const editProfile_user: any = createAsyncThunk(
  "userSlice/editProfile",
  async (values: any, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      (await axios.patch("/api/profile", values)).data;
      toast.success("Profile updated successfully");
      return values;
    } catch (error: any) {
      toast.error("Something went wrong updating profile");
      return rejectWithValue(error.message);
    }
  }
);
export const deleteUser_user: any = createAsyncThunk(
  "userSlice/editProfile",
  async (email: string, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      await axios.delete("/api/profile?email=" + email);
      toast.success("Account deleted successfully!");
    } catch (error: any) {
      toast.error("Something went wrong deleting account try again!");
      return rejectWithValue(error.message);
    }
  }
);
type UserState = {
  users: UserData[];
  profile: null | UserData;
  loading: boolean;
  error: null;
};
const initialState: UserState = {
  users: [],
  profile: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder
    //   .addCase(getUsers.pending, (state: UserState, action: PayloadAction<any>) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(getUsers.fulfilled, (state: UserState, action: PayloadAction<any>) => {
    //     state.loading = false;
    //     state.users = action.payload;
    //   })
    //   .addCase(getUsers.rejected, (state: UserState, action: PayloadAction<any>) => {
    //     state.loading = false;
    //     state.error = action.payload;
    //   });
    builder
      .addCase(
        getUser_user.pending,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getUser_user.fulfilled,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )
      .addCase(
        getUser_user.rejected,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        editProfile_user.pending,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        editProfile_user.fulfilled,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = false;
          state.profile = { ...state.profile, ...action.payload };
        }
      )
      .addCase(
        editProfile_user.rejected,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

  },
});
export default userSlice.reducer;
