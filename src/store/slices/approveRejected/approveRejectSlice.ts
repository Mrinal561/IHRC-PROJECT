// complianceSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '@/api/endpoint';
import httpClient from "@/api/http-client";

export type ApproveRejectCompliances = {
    status: string;
    compliace_data_id: number[];
}

interface ComplianceState {
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: ComplianceState = {
    loading: false,
    error: null,
    success: false,
};

export const approveRejectComplianceStatus = createAsyncThunk(
    'compliance/approveRejectStatus',
    async (statusData: ApproveRejectCompliances) => {
        const { data } = await httpClient.put(endpoints.compliance.approveReject(), statusData);
        return data;
    }
);

const complianceSlice = createSlice({
    name: 'compliance',
    initialState,
    reducers: {
        resetComplianceState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(approveRejectComplianceStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(approveRejectComplianceStatus.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(approveRejectComplianceStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
                state.success = false;
            });
    },
});

export const { resetComplianceState } = complianceSlice.actions;
export default complianceSlice.reducer;