import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "@/api/http-client";
import { endpoints } from "@/api/endpoint";

export type PfIwTrackerCreate = {
    document: File;
    month: string;
};

export interface PfIwTrackerState {
    documents: File[];
    loading: boolean;
    error: string | null;
}

const initialState: PfIwTrackerState = {
    documents: [],
    loading: false,
    error: null,
};

// Create PF Tracker
export const createPfIwTracker = createAsyncThunk(
    'pfTracker/create',
    async (pfTrackerData: PfIwTrackerCreate, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.post(endpoints.pfiwtracker.bulkupload(), pfTrackerData,{
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

const pfIwTrackerSlice = createSlice({
    name: 'pfIwTracker',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createPfIwTracker.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPfIwTracker.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createPfIwTracker.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default pfIwTrackerSlice.reducer;