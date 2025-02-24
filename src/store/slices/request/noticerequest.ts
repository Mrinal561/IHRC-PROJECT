import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define the interface for the request payload
interface CompanyAdminNoticeRequestPayload {
  type: number;
}

// Define the interface for the notice request history item
interface NoticeRequestHistoryItem {
  id: string;
  type: number;
  status: string;
  createdAt: string;
}

// Define the initial state type
interface CompanyAdminNoticeRequestState {
  loading: boolean;
  success: boolean;
  error: string | null;
  noticeRequests: NoticeRequestHistoryItem[];
}

// Initial state
const initialState: CompanyAdminNoticeRequestState = {
  loading: false,
  success: false,
  error: null,
  noticeRequests: [],
};

// Create the async thunk for the admin request (POST)
export const requestNoticeEdit = createAsyncThunk(
  'notice/requestEdit',
  async (payload: { noticeId?: number; replyId?: number; followUpId?: number }, { dispatch }) => {
    const response = await httpClient.post(endpoints.request.requestEdit(), payload);
    return response.data;
  }
);

// Create the async thunk for fetching all notice requests (GET)
export const fetchAllNoticeRequests = createAsyncThunk(
  'companyAdminNoticeRequest/fetchAllNoticeRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await httpClient.get(
        endpoints.request.getAllNoticeRequest()
      );
      return response.data;
    } catch (error: any) {
      // Handle error responses
      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'An error occurred while fetching notice requests'
      );
    }
  }
);

// Create the slice
const companyAdminNoticeRequestSlice = createSlice({
  name: 'companyAdminNoticeRequest',
  initialState,
  reducers: {
    // Reset the state to initial conditions
    resetCompanyAdminNoticeRequest: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.noticeRequests = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle requestNoticeEdit (POST)
      .addCase(requestNoticeEdit.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(requestNoticeEdit.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(requestNoticeEdit.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      })

      // Handle fetchAllNoticeRequests (GET)
      .addCase(fetchAllNoticeRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllNoticeRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.noticeRequests = action.payload;
      })
      .addCase(fetchAllNoticeRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

// Export actions and reducer
export const { resetCompanyAdminNoticeRequest } = companyAdminNoticeRequestSlice.actions;
export default companyAdminNoticeRequestSlice.reducer;