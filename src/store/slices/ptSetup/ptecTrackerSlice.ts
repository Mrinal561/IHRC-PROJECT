import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "@/api/http-client";
import { endpoints } from "@/api/endpoint";

export type PtecTrackerCreate = {
    document: File;
    month: string;
};

export interface PtecTrackerState {
    documents: File[];
    loading: boolean;
    error: string | null;
}

const initialState: PtecTrackerState = {
    documents: [],
    loading: false,
    error: null,
};

// Create PTEC Tracker
export const createPtecTracker = createAsyncThunk(
    'ptecTracker/create',
    async (ptecTrackerData: PtecTrackerCreate, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.post(endpoints.ptec.bulkUpload(), ptecTrackerData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create PTEC Tracker');
        }
    }
);

const ptecTrackerSlice = createSlice({
    name: 'ptecTracker',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPtecTracker.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPtecTracker.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createPtecTracker.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default ptecTrackerSlice.reducer;