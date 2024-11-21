import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "@/api/http-client";
import { endpoints } from "@/api/endpoint";

export type EsiTrackerCreate = {
    document: File;
    month: string;
};

export interface EsiTrackerState {
    documents: File[];
    loading: boolean;
    error: string | null;
}

const initialState: EsiTrackerState = {
    documents: [],
    loading: false,
    error: null,
};

// Create PF Tracker
export const createEsiTracker = createAsyncThunk(
    'pfTracker/create',
    async (EsiTrackerData: EsiTrackerCreate, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.post(endpoints.esiTracker.bulkUpload(), EsiTrackerData,{
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

const EsiTrackerSlice = createSlice({
    name: 'pfIwTracker',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createEsiTracker.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createEsiTracker.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createEsiTracker.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default EsiTrackerSlice.reducer;