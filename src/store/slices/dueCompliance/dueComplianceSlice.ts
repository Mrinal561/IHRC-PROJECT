import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DueComplianceDetailData } from '@/@types/dueCompliance';
import ApiService from '@/services/ApiService';

// Define the state interface
export interface DueComplianceState {
    data: DueComplianceDetailData[];
    loading: boolean;
}

// Define initial state
const initialState: DueComplianceState = {
    data: [],
    loading: false,
};

// Create async thunk for fetching all due compliances
export const fetchDueCompliances = createAsyncThunk(
    'dueCompliance/fetchAll',
    async () => {
        const response = await ApiService.fetchData<DueComplianceDetailData[]>({
            url: '/assigned-checklist',
            method: 'get',
        });
        return response.data;
    }
);

// Create the slice
const dueComplianceSlice = createSlice({
    name: 'dueCompliance',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDueCompliances.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDueCompliances.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchDueCompliances.rejected, (state) => {
                state.loading = false;
            });
    },
});

// Export selectors
export const selectDueComplianceData = (state: { dueCompliance: DueComplianceState }) => 
    state.dueCompliance.data;
export const selectDueComplianceLoading = (state: { dueCompliance: DueComplianceState }) => 
    state.dueCompliance.loading;

// Export reducer
export default dueComplianceSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { StatusRequest, StatusResponse } from '@/@types/status';
// import { createAssignStatus } from '@/services/StatusService';
// import { endpoints } from '@/api/endpoint';

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

// export const updateStatus = createAsyncThunk<
//   StatusResponse,
//   StatusRequest
// >(
//   'status/update',
//   async (complianceData, { rejectWithValue }) => {
//     try {
//       const { data } = await createAssignStatus(endpoints.assign.create(), complianceData);
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