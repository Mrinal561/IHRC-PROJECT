import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "@/api/http-client";
import { endpoints } from "@/api/endpoint";

export type PtrcTrackerCreate = {
    document: File;
    month: string;
};

export interface PtrcTrackerState {
    currentTracker: any | null; // Replace 'any' with your specific type
    documents: File[];
    loading: boolean;
    error: string | null;
    isDeleted: boolean;

}

const initialState: PtrcTrackerState = {
    currentTracker: null,
    documents: [],
    loading: false,
    error: null,
    isDeleted: false,

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

export const fetchPtrcTrackerById = createAsyncThunk(
    'ptrcTracker/fetchById',
    async (trackerId: string, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.get(endpoints.ptrc.getById(trackerId));
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch PTEC tracker');
        }
    }
);

// Delete PTEC Tracker
export const deletePtrcTracker = createAsyncThunk(
    'ptrcTracker/delete',
    async (trackerId: string, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.delete(endpoints.ptrc.delete(trackerId));
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete PTEC tracker');
        }
    }
);

const ptrcTrackerSlice = createSlice({
    name: 'ptrcTracker',
    initialState,
    reducers: {
        clearCurrentTracker: (state) => {
            state.currentTracker = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetDeleteStatus: (state) => {
            state.isDeleted = false;
        }
    },    extraReducers: (builder) => {
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
            })
             // Fetch PTEC Tracker Cases
             .addCase(fetchPtrcTrackerById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPtrcTrackerById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTracker = action.payload;
            })
            .addCase(fetchPtrcTrackerById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete PTEC Tracker Cases
            .addCase(deletePtrcTracker.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isDeleted = false;
            })
            .addCase(deletePtrcTracker.fulfilled, (state) => {
                state.loading = false;
                state.currentTracker = null;
                state.isDeleted = true;
            })
            .addCase(deletePtrcTracker.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isDeleted = false;
            });
    },
});

export const {
    clearCurrentTracker,
    clearError,
    resetDeleteStatus
} = ptrcTrackerSlice.actions;

export default ptrcTrackerSlice.reducer;