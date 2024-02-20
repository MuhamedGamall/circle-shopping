import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UserData } from "../../../types";
import toast from "react-hot-toast";

// export const getUsers: any = createAsyncThunk(
//   "usersSlice/getUsers",
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
export const getUser: any = createAsyncThunk(
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

export const editProfile: any = createAsyncThunk(
  "usersSlice/editProfile",
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
export const deleteUser: any = createAsyncThunk(
  "usersSlice/editProfile",
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

const usersSlice = createSlice({
  name: "usersSlice",
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
          state.profile = action.payload;
        }
      )
      .addCase(
        getUser.rejected,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    builder
      .addCase(
        editProfile.pending,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        editProfile.fulfilled,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = false;
          state.profile = { ...state.profile, ...action.payload };
        }
      )
      .addCase(
        editProfile.rejected,
        (state: UserState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    //TODO: create delete user
    // builder
    //   .addCase(
    //     deleteUser.pending,
    //     (state: UserState, action: PayloadAction<any>) => {
    //       state.loading = true;
    //       state.error = null;
    //     }
    //   )
    //   .addCase(
    //     deleteUser.fulfilled,
    //     (state: UserState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.us = { ...state.profile, ...action.payload };
    //     }
    //   )
    //   .addCase(
    //     deleteUser.rejected,
    //     (state: UserState, action: PayloadAction<any>) => {
    //       state.loading = false;
    //       state.error = action.payload;
    //     }
    //   );
  },
});
export default usersSlice.reducer;
