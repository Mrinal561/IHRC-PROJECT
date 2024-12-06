// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import httpClient from "@/api/http-client";
// import { endpoints } from "@/api/endpoint";

// export type PtecTrackerCreate = {
//     document: File;
//     month: string;
// };

// export interface PtecTrackerState {
//     documents: File[];
//     loading: boolean;
//     error: string | null;
// }

// const initialState: PtecTrackerState = {
//     documents: [],
//     loading: false,
//     error: null,
// };

// // Create PTEC Tracker
// export const createPtecTracker = createAsyncThunk(
//     'ptecTracker/create',
//     async (ptecTrackerData: PtecTrackerCreate, { rejectWithValue }) => {
//         try {
//             const { data } = await httpClient.post(endpoints.ptec.bulkUpload(), ptecTrackerData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             return data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to create PTEC Tracker');
//         }
//     }
// );

// const ptecTrackerSlice = createSlice({
//     name: 'ptecTracker',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(createPtecTracker.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(createPtecTracker.fulfilled, (state, action) => {
//                 state.loading = false;
//             })
//             .addCase(createPtecTracker.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             });
//     },
// });

// export default ptecTrackerSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "@/api/http-client";
import { endpoints } from "@/api/endpoint";

export type PtecTrackerCreate = {
    document: File;
    month: string;
};

export interface PtecTrackerState {
    currentTracker: any | null; // Replace 'any' with your specific type
    documents: File[];
    loading: boolean;
    error: string | null;
    isDeleted: boolean;
}

const initialState: PtecTrackerState = {
    currentTracker: null,
    documents: [],
    loading: false,
    error: null,
    isDeleted: false,
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

// Fetch PTEC Tracker by ID
export const fetchPtecTrackerById = createAsyncThunk(
    'ptecTracker/fetchById',
    async (trackerId: string, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.get(endpoints.ptec.getById(trackerId));
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch PTEC tracker');
        }
    }
);

// Delete PTEC Tracker
export const deletePtecTracker = createAsyncThunk(
    'ptecTracker/delete',
    async (trackerId: string, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.delete(endpoints.ptec.delete(trackerId));
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete PTEC tracker');
        }
    }
);

const ptecTrackerSlice = createSlice({
    name: 'ptecTracker',
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
    },
    extraReducers: (builder) => {
        builder
            // Create PTEC Tracker Cases
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
            })

            // Fetch PTEC Tracker Cases
            .addCase(fetchPtecTrackerById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPtecTrackerById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTracker = action.payload;
            })
            .addCase(fetchPtecTrackerById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Delete PTEC Tracker Cases
            .addCase(deletePtecTracker.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isDeleted = false;
            })
            .addCase(deletePtecTracker.fulfilled, (state) => {
                state.loading = false;
                state.currentTracker = null;
                state.isDeleted = true;
            })
            .addCase(deletePtecTracker.rejected, (state, action) => {
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
} = ptecTrackerSlice.actions;

export default ptecTrackerSlice.reducer;