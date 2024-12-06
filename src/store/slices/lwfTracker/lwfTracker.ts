// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import httpClient from "@/api/http-client";
// import { endpoints } from "@/api/endpoint";

// // Define the type for LWF data
// export interface LwfTrackerData {
//     // Add your LWF tracker specific fields here
//     id: string;
//     // ... other fields
// }

// export interface LwfTrackerId {
//     currentTracker: LwfTrackerData | null;
//     loading: boolean;
//     error: string | null;
// }

// const initialState: LwfTrackerId = {
//     currentTracker: null,
//     loading: false,
//     error: null
// };

// // Create async thunk for fetching LWF tracker by ID
// export const fetchLwfTrackerById = createAsyncThunk(
//     'lwfTracker/fetchById',
//     async (trackerId: string, { rejectWithValue }) => {
//         try {
//             const { data } = await httpClient.get(endpoints.lwftracker.getById(trackerId));
//             return data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to fetch LWF tracker');
//         }
//     }
// );

// const lwfTrackerSlice = createSlice({
//     name: 'lwfTracker',
//     initialState,
//     reducers: {
//         clearCurrentTracker: (state) => {
//             state.currentTracker = null;
//         },
//         clearError: (state) => {
//             state.error = null;
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             // Fetch LWF Tracker Cases
//             .addCase(fetchLwfTrackerById.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchLwfTrackerById.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.currentTracker = action.payload;
//             })
//             .addCase(fetchLwfTrackerById.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             });
//     },
// });

// export const {
//     clearCurrentTracker,
//     clearError
// } = lwfTrackerSlice.actions;

// export default lwfTrackerSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "@/api/http-client";
import { endpoints } from "@/api/endpoint";

// Define the type for LWF data
export interface LwfTrackerData {
    // Add your LWF tracker specific fields here
    id: string;
    // ... other fields
}

export interface LwfTrackerId {
    currentTracker: LwfTrackerData | null;
    loading: boolean;
    error: string | null;
    isDeleted: boolean; // Added for delete status tracking
}

const initialState: LwfTrackerId = {
    currentTracker: null,
    loading: false,
    error: null,
    isDeleted: false // Added initial state for delete status
};

// Create async thunk for fetching LWF tracker by ID
export const fetchLwfTrackerById = createAsyncThunk(
    'lwfTracker/fetchById',
    async (trackerId: string, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.get(endpoints.lwftracker.getById(trackerId));
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch LWF tracker');
        }
    }
);

// Create async thunk for deleting LWF tracker
export const deleteLwfTracker = createAsyncThunk(
    'lwfTracker/delete',
    async (trackerId: string, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.delete(endpoints.lwftracker.delete(trackerId));
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete LWF tracker');
        }
    }
);

const lwfTrackerSlice = createSlice({
    name: 'lwfTracker',
    initialState,
    reducers: {
        clearCurrentTracker: (state) => {
            state.currentTracker = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetDeleteStatus: (state) => { // Added reset action for delete status
            state.isDeleted = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch LWF Tracker Cases
            .addCase(fetchLwfTrackerById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLwfTrackerById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTracker = action.payload;
            })
            .addCase(fetchLwfTrackerById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            
            // Delete LWF Tracker Cases
            .addCase(deleteLwfTracker.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isDeleted = false;
            })
            .addCase(deleteLwfTracker.fulfilled, (state) => {
                state.loading = false;
                state.currentTracker = null;
                state.isDeleted = true;
            })
            .addCase(deleteLwfTracker.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isDeleted = false;
            });
    },
});

export const { 
    clearCurrentTracker, 
    clearError,
    resetDeleteStatus // Added export for new action
} = lwfTrackerSlice.actions;

export default lwfTrackerSlice.reducer;