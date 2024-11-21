import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "@/api/http-client";
import { endpoints } from "@/api/endpoint";

export type PfTrackerCreate = {
    document: File;
    month: string;
};

export interface PfTrackerState {
    documents: File[];
    loading: boolean;
    error: string | null;
}

const initialState: PfTrackerState = {
    documents: [],
    loading: false,
    error: null,
};

// Create PF Tracker
export const createPfTracker = createAsyncThunk(
    'pfTracker/create',
    async (pfTrackerData: PfTrackerCreate, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.post(endpoints.tracker.pfUpload(), pfTrackerData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create PF Tracker');
        }
    }
);

const pfTrackerSlice = createSlice({
    name: 'pfTracker',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPfTracker.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPfTracker.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createPfTracker.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default pfTrackerSlice.reducer;