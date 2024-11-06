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