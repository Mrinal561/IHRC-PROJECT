// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { PfChallanData } from '@/@types/pfTracker'; // Adjust the import path as needed
// import { endpoints } from "@/api/endpoint";
// import httpClient from "@/api/http-client";

// export interface TrackerState {
//     currentTracker: PfChallanData | null;
//     loading: boolean;
//     error: string | null;
//     isDeleted: boolean;
// }

// const initialState: TrackerState = {
//     currentTracker: null,
//     loading: false,
//     error: null,
//     isDeleted: false,
// };

// export const fetchTrackerById = createAsyncThunk(
//     'tracker/fetchTrackerById',
//     async (trackerId: string, { rejectWithValue }) => {
//         try {
//             const { data } = await httpClient.get(endpoints.tracker.getById(trackerId));
//             return data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to fetch tracker');
//         }
//     }
// );

// export const deleteTracker = createAsyncThunk(
//     'tracker/deleteTracker',
//     async (trackerId: string, { rejectWithValue }) => {
//         try {
//             const { data } = await httpClient.delete(endpoints.tracker.delete(trackerId));
//             return data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to delete tracker');
//         }
//     }
// );

// const trackerSlice = createSlice({
//     name: 'tracker',
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
// } = trackerSlice.actions;
// export default trackerSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { PfChallanData } from '@/@types/pfTracker'; // Adjust the import path as needed
// import { endpoints } from "@/api/endpoint";
// import httpClient from "@/api/http-client";

// export interface TrackerState {
//     currentTracker: PfChallanData | null;
//     loading: boolean;
//     error: string | null;
//     isDeleted: boolean;
//     isPfiwDeleted: boolean;
// }

// const initialState: TrackerState = {
//     currentTracker: null,
//     loading: false,
//     error: null,
//     isDeleted: false,
//     isPfiwDeleted: false,
// };

// export const fetchTrackerById = createAsyncThunk(
//     'tracker/fetchTrackerById',
//     async (trackerId: string, { rejectWithValue }) => {
//         try {
//             const { data } = await httpClient.get(endpoints.tracker.getById(trackerId));
//             return data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to fetch tracker');
//         }
//     }
// );

// export const deleteTracker = createAsyncThunk(
//     'tracker/deleteTracker',
//     async (trackerId: string, { rejectWithValue }) => {
//         try {
//             const { data } = await httpClient.delete(endpoints.tracker.delete(trackerId));
//             return data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to delete tracker');
//         }
//     }
// );

// export const deletePfiwTracker = createAsyncThunk(
//     'tracker/deletePfiwTracker',
//     async (trackerId: string, { rejectWithValue }) => {
//         try {
//             const { data } = await httpClient.delete(endpoints.pfiwtracker.delete(trackerId));
//             return data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to delete PFIW tracker');
//         }
//     }
// );

// const trackerSlice = createSlice({
//     name: 'tracker',
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
//             state.isPfiwDeleted = false;
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
//             })

//             // Delete PFIW Tracker Cases
//             .addCase(deletePfiwTracker.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//                 state.isPfiwDeleted = false;
//             })
//             .addCase(deletePfiwTracker.fulfilled, (state) => {
//                 state.loading = false;
//                 state.currentTracker = null;
//                 state.isPfiwDeleted = true;
//             })
//             .addCase(deletePfiwTracker.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//                 state.isPfiwDeleted = false;
//             });
//     },
// });

// export const {
//     clearCurrentTracker,
//     clearError,
//     resetDeleteStatus
// } = trackerSlice.actions;
// export default trackerSlice.reducer;



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PfChallanData } from '@/@types/pfTracker';
import { endpoints } from "@/api/endpoint";
import httpClient from "@/api/http-client";

export interface TrackerState {
    currentTracker: PfChallanData | null;
    loading: boolean;
    error: string | null;
    isDeleted: boolean;
    isPfiwDeleted: boolean;
}

const initialState: TrackerState = {
    currentTracker: null,
    loading: false,
    error: null,
    isDeleted: false,
    isPfiwDeleted: false,
};

export const fetchTrackerById = createAsyncThunk(
    'tracker/fetchTrackerById',
    async (trackerId: string, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.get(endpoints.tracker.getById(trackerId));
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch tracker');
        }
    }
);

export const fetchPfiwTrackerById = createAsyncThunk(
    'tracker/fetchPfiwTrackerById',
    async (trackerId: string, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.get(endpoints.pfiwtracker.getById(trackerId));
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch PFIW tracker');
        }
    }
);

export const deleteTracker = createAsyncThunk(
    'tracker/deleteTracker',
    async (trackerId: string, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.delete(endpoints.tracker.delete(trackerId));
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete tracker');
        }
    }
);

export const deletePfiwTracker = createAsyncThunk(
    'tracker/deletePfiwTracker',
    async (trackerId: string, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.delete(endpoints.pfiwtracker.delete(trackerId));
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete PFIW tracker');
        }
    }
);

export const updatePfiwTracker = createAsyncThunk(
    'tracker/updatePfiwTracker',
    async ({ id, data }: { id: string; data: Partial<PfChallanData> }, { rejectWithValue }) => {
        try {
            const response = await httpClient.put(endpoints.pfiwtracker.update(id), data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update PFIW tracker');
        }
    }
);

export const updatePfTracker = createAsyncThunk(
    'tracker/updatePfTracker',
    async ({ id, data }: { id: any; data: Partial<PfChallanData> }, { rejectWithValue }) => {
        try {
            const response = await httpClient.put(endpoints.tracker.update(id), data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update PF tracker');
        }
    }
);

const trackerSlice = createSlice({
    name: 'tracker',
     initialState: {
        ...initialState,
        isUpdated: false, 
    },
    reducers: {
        clearCurrentTracker: (state) => {
            state.currentTracker = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetDeleteStatus: (state) => {
            state.isDeleted = false;
            state.isPfiwDeleted = false;
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
            
            // Fetch PFIW Tracker Cases
            .addCase(fetchPfiwTrackerById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPfiwTrackerById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTracker = action.payload;
            })
            .addCase(fetchPfiwTrackerById.rejected, (state, action) => {
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

            // Delete PFIW Tracker Cases
            .addCase(deletePfiwTracker.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isPfiwDeleted = false;
            })
            .addCase(deletePfiwTracker.fulfilled, (state) => {
                state.loading = false;
                state.currentTracker = null;
                state.isPfiwDeleted = true;
            })
            .addCase(deletePfiwTracker.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isPfiwDeleted = false;
            })
        
            .addCase(updatePfiwTracker.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isUpdated = false;
            })
            .addCase(updatePfiwTracker.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTracker = action.payload;
                state.isUpdated = true;
            })
            .addCase(updatePfiwTracker.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.isUpdated = false;
            })
         .addCase(updatePfTracker.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.isUpdated = false;
            })
            .addCase(updatePfTracker.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTracker = action.payload;
                state.isUpdated = true;
            })
            .addCase(updatePfTracker.rejected, (state, action) => {
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
} = trackerSlice.actions;
export default trackerSlice.reducer;