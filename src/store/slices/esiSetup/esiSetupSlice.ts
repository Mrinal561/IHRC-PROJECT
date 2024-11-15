import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "@/api/endpoint";
import httpClient from "@/api/http-client";
import { EsiSetupData, EsiSetupResponseData } from "@/@types/esiSetup";

export interface EsiSetupState {
    esisetup: EsiSetupData[];
    loading: boolean;
    error: string | null;
    createEsisetup: EsiSetupData | null;
}

const initialState: EsiSetupState = {
    esisetup: [],
    loading: false,
    error: null,
    createEsisetup: null,
};

export const fetchEsiSetup = createAsyncThunk(
    'esisetup/fetchEsiSetup',
    async () => {
        const { data } = await httpClient.get(endpoints.esiSetup.getAll());
        return data;
    }
);
export const fetchEsiTracker = createAsyncThunk(
    'esisetup/fetchEsiSetup',
    async () => {
        const { data } = await httpClient.get(endpoints.esiTracker.getAll());
        return data;
    }
);

export const createEsiSetup = createAsyncThunk(
    'esisetup/createEsiSetup',
    async (esiData: EsiSetupData, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.post(endpoints.esiSetup.create(), esiData);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create ESI setup');
        }
    }
);

export const fetchEsiSetupById = createAsyncThunk(
    'esisetup/fetchEsiSetupById',
    async (id: string) => {
        const { data } = await httpClient.get(endpoints.esiSetup.getById(id));
        return data;
    }
);

const esiSetupSlice = createSlice({
    name: 'esisetup',
    initialState,
    reducers: {
        setSelectedEsiSetup: (state, action) => {
            state.createEsisetup = action.payload;
        },
        clearEsiSetup: (state) => {
            state.createEsisetup = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch All ESI Setups
            .addCase(fetchEsiSetup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEsiSetup.fulfilled, (state, action) => {
                state.loading = false;
                state.esisetup = action.payload;
            })
            .addCase(fetchEsiSetup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create ESI Setup
            .addCase(createEsiSetup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createEsiSetup.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createEsiSetup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch ESI Setup by ID
            .addCase(fetchEsiSetupById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEsiSetupById.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(fetchEsiSetupById.rejected, (state, action) => {
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
            //     state.esisetup = action.payload;
            // })
            // .addCase(fetchEsiTracker.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload as string;
            // })
    },
});

export const { setSelectedEsiSetup, clearEsiSetup } = esiSetupSlice.actions;
export default esiSetupSlice.reducer;