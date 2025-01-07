import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "@/api/endpoint";
import httpClient from "@/api/http-client";
import { PFData } from "@/@types/pfData"; // Adjust the import path as needed

export interface PFState {
    pfData: PFData[];
    loading: boolean;
    error: string | null;
    selectedPF: PFData | null;
}

const initialState: PFState = {
    pfData: [],
    loading: false,
    error: null,
    selectedPF: null,
};

// Fetch all PF records
export const fetchPFData = createAsyncThunk(
    'pf/fetchPFData',
    async () => {
        const { data } = await httpClient.get(endpoints.pfSetup.getAll());
        return data;
    }
);

// Create new PF record
export const createPF = createAsyncThunk(
    'pf/createPF',
    async (pfData: Partial<PFData>, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.post(endpoints.pfSetup.create(), pfData);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

// Fetch PF record by ID
export const fetchPFById = createAsyncThunk(
    'pf/fetchPFById',
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.get(endpoints.pfSetup.getById(id));
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message )
       }
    }
);

// Update PF record
export const updatePF = createAsyncThunk(
    'pf/updatePF',
    async ({ id, pfData }: { id: string; pfData: Partial<PFData> }, { rejectWithValue }) => {
        try {
            const response = await httpClient.put(endpoints.pfSetup.update(id), pfData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update PF record');
        }
    }
);

// Delete PF record
export const deletePF = createAsyncThunk(
    'pf/deletePF',
    async (id: string, { rejectWithValue }) => {
        try {
            await httpClient.delete(endpoints.pfSetup.delete(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete PF record');
        }
    }
);

const pfSlice = createSlice({
    name: 'pf',
    initialState,
    reducers: {
        setSelectedPF: (state, action) => {
            state.selectedPF = action.payload;
        },
        clearSelectedPF: (state) => {
            state.selectedPF = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch All PF Records
            .addCase(fetchPFData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPFData.fulfilled, (state, action) => {
                state.loading = false;
                state.pfData = action.payload;
            })
            .addCase(fetchPFData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch PF data';
            })
            // Create PF Record
            .addCase(createPF.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPF.fulfilled, (state, action) => {
                state.loading = false;
                state.pfData = [...state.pfData, action.payload];
            })
            .addCase(createPF.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch PF by ID
            .addCase(fetchPFById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPFById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedPF = action.payload;
            })
            .addCase(fetchPFById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch PF record';
            })
            // Update PF
            .addCase(updatePF.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePF.fulfilled, (state, action) => {
                state.loading = false;
                state.pfData = state.pfData.map(pf => 
                    pf.id === action.payload.id ? action.payload : pf
                );
            })
            .addCase(updatePF.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Delete PF
            .addCase(deletePF.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePF.fulfilled, (state, action) => {
                state.loading = false;
                state.pfData = state.pfData.filter(pf => pf.id.toString() !== action.payload);
            })
            .addCase(deletePF.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSelectedPF, clearSelectedPF } = pfSlice.actions;
export default pfSlice.reducer;