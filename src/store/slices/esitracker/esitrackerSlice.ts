// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { esiChallanData } from "@/@types/esiTracker";
// import { endpoints } from "@/api/endpoint";
// import httpClient from "@/api/http-client";

// export interface ESITrackersState {
//     currentTracker: esiChallanData | null;
//     loading: boolean;
//     error: string | null;
//     isDeleted: boolean;
// }

// const initialState: ESITrackersState = {
//     currentTracker: null,
//     loading: false,
//     error: null,
//     isDeleted: false,
// };

// export const fetchTrackerById = createAsyncThunk(
//     'esitracker/fetchESITrackerById',
//     async (trackerId: string, { rejectWithValue }) => {
//         try {
//             const { data } = await httpClient.get(endpoints.esiTracker.getById(trackerId));
//             return data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message);
//         }
//     }
// );

// export const deleteTracker = createAsyncThunk(
//     'esitracker/deleteESITracker',
//     async (trackerId: string, { rejectWithValue }) => {
//         try {
//             const { data } = await httpClient.delete(endpoints.esiTracker.delete(trackerId));
//             return data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message);
//         }
//     }
// );

// const esiTrackerSlice = createSlice({
//     name: 'esitracker',
//     initialState,
//     reducers: {
//         clearCurrentTracker: (state) => {
//             state.currentTracker = null;
//         },
//         clearError: (state) => {
//             state.error = null;
//         },
//         resetDeleteStatus: (state) => {
//             state.isDeleted = false;
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             // Fetch Tracker Cases
//             .addCase(fetchTrackerById.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchTrackerById.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.currentTracker = action.payload;
//             })
//             .addCase(fetchTrackerById.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
            
//             // Delete Tracker Cases
//             .addCase(deleteTracker.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//                 state.isDeleted = false;
//             })
//             .addCase(deleteTracker.fulfilled, (state) => {
//                 state.loading = false;
//                 state.currentTracker = null;
//                 state.isDeleted = true;
//             })
//             .addCase(deleteTracker.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//                 state.isDeleted = false;
//             });
//     },
// });

// export const {
//     clearCurrentTracker,
//     clearError,
//     resetDeleteStatus
// } = esiTrackerSlice.actions;
// export default esiTrackerSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { esiChallanData } from "@/@types/esiTracker";
import { endpoints } from "@/api/endpoint";
import httpClient from "@/api/http-client";

export interface ESITrackersState {
    currentTracker: esiChallanData | null;
    loading: boolean;
    error: string | null;
    isDeleted: boolean;
    isUpdated: boolean;
}

const initialState: ESITrackersState = {
    currentTracker: null,
    loading: false,
    error: null,
    isDeleted: false,
    isUpdated: false,
};

export const fetchTrackerById = createAsyncThunk(
    'esitracker/fetchESITrackerById',
    async (trackerId: string, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.get(endpoints.esiTracker.getById(trackerId));
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteTracker = createAsyncThunk(
    'esitracker/deleteESITracker',
    async (trackerId: string, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.delete(endpoints.esiTracker.delete(trackerId));
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateTracker = createAsyncThunk(
  'esitracker/updateESITracker',
  async ({ id, data }: { id: string; data: Partial<esiChallanData> }, { rejectWithValue }) => {
    try {
      const response = await httpClient.put(endpoints.esiTracker.update(id), data, {
        headers: {
          'Content-Type': 'application/json', // Assuming JSON payload; adjust if needed
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update tracker');
    }
  }
);
const esiTrackerSlice = createSlice({
    name: 'esitracker',
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
    },
    extraReducers: (builder) => {
        builder
            // Fetch Tracker Cases
            .addCase(fetchTrackerById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrackerById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTracker = action.payload;
            })
            .addCase(fetchTrackerById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            
            // Delete Tracker Cases
            .addCase(deleteTracker.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isDeleted = false;
            })
            .addCase(deleteTracker.fulfilled, (state) => {
                state.loading = false;
                state.currentTracker = null;
                state.isDeleted = true;
            })
            .addCase(deleteTracker.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isDeleted = false;
            })

            // Update Tracker Cases
            .addCase(updateTracker.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isUpdated = false;
            })
            .addCase(updateTracker.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTracker = action.payload;
                state.isUpdated = true;
            })
            .addCase(updateTracker.rejected, (state, action) => {
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
} = esiTrackerSlice.actions;
export default esiTrackerSlice.reducer;