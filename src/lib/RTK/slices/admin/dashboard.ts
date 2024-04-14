import { AccountData, Product, Store } from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DateRange } from "react-day-picker";

export const getAdminDashboardAnalytics: any = createAsyncThunk(
  "adminDashboardSlice/getAnalytics",
  async (date: DateRange | null, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      let check = "";
      if (date && date.from && date.to) {
        check = `?date_filter=${date.from},${date.to}`;
      }

      const data = (await axios.get("/api/admin/dashboard/analytics" + check))
        .data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

type DashboardState = {
  analytics: {
    top_sales: Product[];
    admin_length: number | null;
    users_length: number | null;
    top_users: AccountData[];
    top_selling_by_categories: {
      _id: string;
      sales_count: number | null;
    }[];
    total_sales: number | null;
    sales_count: number | null;
    top_sellers: Store[];
    top_selling_by_country: {
      _id: string;
      total_sales: number | null;
      sales_count: number | null;
    }[];
  } | null;
  loading: boolean;
  error: null;
};
const initialState: DashboardState = {
  analytics: {
    top_sales: [],
    admin_length: 0,
    users_length: 0,
    sales_count: 0,
    total_sales: 0,
    top_users: [],
    top_selling_by_categories: [
      {
        _id: "",
        sales_count: 0,
      },
    ],
    top_sellers: [],
    top_selling_by_country: [
      {
        _id: "",
        total_sales: 0,
        sales_count: 0,
      },
    ],
  },
  loading: false,
  error: null,
};

const adminDashboardSlice = createSlice({
  name: "adminDashboardSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getAdminDashboardAnalytics.pending,
        (state: DashboardState, action: PayloadAction<any>) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addCase(
        getAdminDashboardAnalytics.fulfilled,
        (state: DashboardState, action: PayloadAction<any>) => {
          state.loading = false;
          state.analytics = action.payload;
        }
      )
      .addCase(
        getAdminDashboardAnalytics.rejected,
        (state: DashboardState, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});
export default adminDashboardSlice.reducer;
