import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "@/api/http-client";
import { endpoints } from "@/api/endpoint";
import { LWFSetupData } from "@/@types/lwfData";



// export interface LWFState{
//     lwfData: LWFSetupData[];
//     loading: boolean;
//     error: string | null;
// }
export type LwfTrackerCreate = {
    document: File;
    month: string;
};

export interface LwfTrackerState {
    lwfData: LWFSetupData[];
    documents: File[];
    loading: boolean;
    error: string | null;
}

const initialState: LwfTrackerState = {
    lwfData: [],
    documents: [],
    loading: false,
    error: null,
};

// Create LWF Tracker
export const createLwfTracker = createAsyncThunk(
    'lwfTracker/create',
    async (lwfTrackerData: LwfTrackerCreate, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.post(endpoints.lwftracker.bulkupload(), lwfTrackerData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create LWF Tracker');
        }
    }
);
export const fetchLwfById = createAsyncThunk(
    'lwf/fetchLwfById',
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.get(endpoints.lwfSetup.getById(id));
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch LWF data');
        }
    }
);

export const updateLwf = createAsyncThunk(
    'lwfsetup/updateLwfSetup',
    async ({ id, data }: { id: string; data: Partial<LwfTrackerCreate> }, { rejectWithValue }) => {
        try {
            const response = await httpClient.put(endpoints.lwfSetup.update(id), data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update LWF tracker');
        }
    }
);

export const deleteLwf = createAsyncThunk(
    'lwf/deleteLWF',
    async (id: string, { rejectWithValue }) => {
        try {
            await httpClient.delete(endpoints.lwfSetup.delete(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete PF record');
        }
    }
);



const LwfTrackerSlice = createSlice({
    name: 'lwfTracker',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createLwfTracker.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createLwfTracker.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createLwfTracker.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
        .addCase(fetchLwfById.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(fetchLwfById.fulfilled, (state, action) => {
            state.loading = false;
            // Add any specific state updates you need based on the fetched data
            // For example: state.currentLwf = action.payload;
        })
        .addCase(fetchLwfById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(updateLwf.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLwf.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateLwf.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteLwf.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteLwf.fulfilled, (state, action) => {
                state.loading = false;
                state.lwfData = state.lwfData.filter(pf => pf.id.toString() !== action.payload);
            })
            .addCase(deleteLwf.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default LwfTrackerSlice.reducer;