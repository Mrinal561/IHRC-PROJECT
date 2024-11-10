// complianceSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { httpClient } from '@/api/http-client'; // Assuming this is your http client
import { endpoints } from '@/api/endpoint';
import httpClient from "@/api/http-client";

export type AssignCompliances = {
    branch_id: number;
    compliance_id: number[];
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

export const assignCompliancesToBranch = createAsyncThunk(
    'compliance/assignCompliancesToBranch',
    async (complianceData: AssignCompliances) => {
        const { data } = await httpClient.post(endpoints.assign.create(), complianceData);
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
            .addCase(assignCompliancesToBranch.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(assignCompliancesToBranch.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
                state.error = null;
            })
            .addCase(assignCompliancesToBranch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'An error occurred';
                state.success = false;
            });
    },
});

export const { resetComplianceState } = complianceSlice.actions;
export default complianceSlice.reducer;