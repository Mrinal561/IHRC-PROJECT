import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "@/api/http-client";
import { endpoints } from "@/api/endpoint";

export type PtrcTrackerCreate = {
    document: File;
    month: string;
};

export interface PtrcTrackerState {
    documents: File[];
    loading: boolean;
    error: string | null;
}

const initialState: PtrcTrackerState = {
    documents: [],
    loading: false,
    error: null,
};

// Create PTRC Tracker
export const createPtrcTracker = createAsyncThunk(
    'ptrcTracker/create',
    async (ptrcTrackerData: PtrcTrackerCreate, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.post(endpoints.ptrc.bulkUpload(), ptrcTrackerData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create PTRC Tracker');
        }
    }
);

const ptrcTrackerSlice = createSlice({
    name: 'ptrcTracker',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPtrcTracker.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPtrcTracker.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createPtrcTracker.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default ptrcTrackerSlice.reducer;