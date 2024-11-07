// // import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// // import { StatusRequest, StatusResponse } from '@/@types/status';
// // import { createAssignStatus } from '@/services/StatusService';

// // export interface StatusState {
// //   loading: boolean;
// //   error: string | null;
// //   currentStatus: StatusResponse | null;
// // }

// // const initialState: StatusState = {
// //   loading: false,
// //   error: null,
// //   currentStatus: null,
// // };

// // // Simplified async thunk without rejectWithValue
// // export const updateStatus = createAsyncThunk(
// //     'status/update',
// //     async (complianceData: StatusRequest, { rejectWithValue }) => {
// //       try {
// //         const { data } = await createAssignStatus(complianceData.id.toString(), complianceData);
// //         return data as StatusResponse;
// //       } catch (error: any) {
// //         return rejectWithValue(error.message || 'Failed to update status');
// //       }
// //     }
// //   );

// // const statusSlice = createSlice({
// //   name: 'status',
// //   initialState,
// //   reducers: {
// //     resetStatus: (state) => {
// //       state.currentStatus = null;
// //       state.error = null;
// //       state.loading = false;
// //     },
// //     clearError: (state) => {
// //       state.error = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(updateStatus.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(updateStatus.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.currentStatus = action.payload;
// //         state.error = null;
// //       })
// //       .addCase(updateStatus.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.error.message || 'An error occurred';
// //       });
// //   },
// // });

// // export const { resetStatus, clearError } = statusSlice.actions;

// // export const selectStatusLoading = (state: { status: StatusState }) => state.status.loading;
// // export const selectStatusError = (state: { status: StatusState }) => state.status.error;
// // export const selectCurrentStatus = (state: { status: StatusState }) => state.status.currentStatus;

// // export default statusSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { StatusRequest, StatusResponse } from '@/@types/status';
// import { createAssignStatus } from '@/services/StatusService';

// interface StatusState {
//   loading: boolean;
//   error: string | null;
//   currentStatus: StatusResponse | null;
// }

// const initialState: StatusState = {
//   loading: false,
//   error: null,
//   currentStatus: null,
// };

// export const updateStatus = createAsyncThunk(
//   'status/update',
//   async (complianceData: StatusRequest, { rejectWithValue }) => {
//     try {
//       const { data } = await createAssignStatus(complianceData.id.toString(), complianceData);
//       return data as StatusResponse;
//     } catch (error: any) {
//       return rejectWithValue(error.message || 'Failed to update status');
//     }
//   }
// );

// const statusSlice = createSlice({
//   name: 'status',
//   initialState,
//   reducers: {
//     resetStatus: (state) => {
//       state.currentStatus = null;
//       state.error = null;
//       state.loading = false;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(updateStatus.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateStatus.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentStatus = action.payload;
//         state.error = null;
//       })
//       .addCase(updateStatus.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { resetStatus, clearError } = statusSlice.actions;

// export const selectStatusLoading = (state: { status: StatusState }) => state.status.loading;
// export const selectStatusError = (state: { status: StatusState }) => state.status.error;
// export const selectCurrentStatus = (state: { status: StatusState }) => state.status.currentStatus;

// export default statusSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StatusRequest, StatusResponse } from '@/@types/status';
// import { httpClient } from '@/utils/httpClient';
import { endpoints } from '@/api/endpoint';
import httpClient  from '@/api/http-client';    

interface StatusState {
  loading: boolean;
  error: string | null;
  currentStatus: StatusResponse | null;
}

const initialState: StatusState = {
  loading: false,
  error: null,
  currentStatus: null,
};

export const updateStatus = createAsyncThunk<
  StatusResponse,
  { id: string; data: StatusRequest }
>(
  'status/update',
  async ({ id, data }) => {
    const { data: responseData } = await httpClient.put(endpoints.due.updateStatus(id), data);
    return responseData as StatusResponse;
  }
);

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.currentStatus = null;
      state.error = null;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStatus = action.payload;
        state.error = null;
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetStatus, clearError } = statusSlice.actions;

export const selectStatusLoading = (state: { status: StatusState }) => state.status.loading;
export const selectStatusError = (state: { status: StatusState }) => state.status.error;
export const selectCurrentStatus = (state: { status: StatusState }) => state.status.currentStatus;

export default statusSlice.reducer;