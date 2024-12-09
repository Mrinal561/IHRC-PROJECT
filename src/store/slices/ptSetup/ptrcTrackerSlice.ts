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
    isUpdated: boolean; 
}

const initialState: PtrcTrackerState = {
    currentTracker: null,
    documents: [],
    loading: false,
    error: null,
    isDeleted: false,
    isUpdated: false,
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

export const updatePtrcTracker = createAsyncThunk(
    'ptrcTracker/update',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            const response = await httpClient.put(endpoints.ptrc.update(id), data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update PTRC tracker');
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
        },
        resetUpdateStatus: (state) => { 
            state.isUpdated = false;
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
            })
             .addCase(updatePtrcTracker.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isUpdated = false;
            })
            .addCase(updatePtrcTracker.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTracker = action.payload;
                state.isUpdated = true;
            })
            .addCase(updatePtrcTracker.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isUpdated = false;
            });
    },
});

export const {
    clearCurrentTracker,
    clearError,
    resetDeleteStatus,
    resetUpdateStatus
} = ptrcTrackerSlice.actions;

export default ptrcTrackerSlice.reducer;