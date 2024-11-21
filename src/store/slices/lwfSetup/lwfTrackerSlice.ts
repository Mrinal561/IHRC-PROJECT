import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "@/api/http-client";
import { endpoints } from "@/api/endpoint";

export type LwfTrackerCreate = {
    document: File;
    month: string;
};

export interface LwfTrackerState {
    documents: File[];
    loading: boolean;
    error: string | null;
}

const initialState: LwfTrackerState = {
    documents: [],
    loading: false,
    error: null,
};

// Create LWF Tracker
export const createLwfTracker = createAsyncThunk(
    'lwfTracker/create',
    async (lwfTrackerData: LwfTrackerCreate, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.post(endpoints.lwftracker.bulkupload(), lwfTrackerData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create LWF Tracker');
        }
    }
);

const LwfTrackerSlice = createSlice({
    name: 'lwfTracker',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createLwfTracker.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createLwfTracker.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createLwfTracker.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default LwfTrackerSlice.reducer;