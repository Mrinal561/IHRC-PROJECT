import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "@/api/endpoint";
import httpClient from "@/api/http-client";
import { PTSetupData } from "@/@types/ptsetup";


export interface ptsetupState {
    ptsetup: PTSetupData[];
    loading: boolean;
    error: string | null;
    createptsetup: PTSetupData | null;
}

const initialState: ptsetupState = {
    ptsetup: [],
    loading: false,
    error: null,
    createptsetup: null,
}

export const fetchptsetup = createAsyncThunk(
    'ptsetup/fetchptsetup',
    async () => {
        const { data } = await httpClient.get(endpoints.ptSetup.getAll());
        return data;
    }
)

export const fetchPTTracker = createAsyncThunk(
    'ptsetup/fetchPTSetup',
    async () => {
        const { data } = await httpClient.get(endpoints.ptTracker.getAll());
        return data;
    }
);

export const createptsetup = createAsyncThunk(
    'ptsetup/createptsetup',
    async (ptData: PTSetupData, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.post(endpoints.ptSetup.create(), ptData);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create PT setup');
        }
    }
);

export const fetchptsetupById = createAsyncThunk(
    'ptsetup/fetchptsetupById',
    async (id: string) => {
        const { data } = await httpClient.get(endpoints.ptSetup.getById(id));
        return data;
    }
);

const ptsetupSlice = createSlice({
    name: 'ptsetup',
    initialState,
    reducers: {
        setSelectedptsetup: (state, action) => {
            state.createptsetup = action.payload;
        },
        clearptsetup: (state) => {
            state.createptsetup = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch All ESI Setups
            .addCase(fetchptsetup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchptsetup.fulfilled, (state, action) => {
                state.loading = false;
                state.ptsetup = action.payload;
            })
            .addCase(fetchptsetup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create ESI Setup
            .addCase(createptsetup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createptsetup.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createptsetup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch ESI Setup by ID
            .addCase(fetchptsetupById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchptsetupById.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(fetchptsetupById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // // Fetch All ESI Tracker
            // .addCase(fetchEsiTracker.pending, (state) => {
            //     state.loading = true;
            //     state.error = null;
            // })
            // .addCase(fetchEsiTracker.fulfilled, (state, action) => {
            //     state.loading = false;
            //     state.ptsetup = action.payload;
            // })
            // .addCase(fetchEsiTracker.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload as string;
            // })
    },
});

export const { setSelectedptsetup, clearptsetup } = ptsetupSlice.actions;
export default ptsetupSlice.reducer;