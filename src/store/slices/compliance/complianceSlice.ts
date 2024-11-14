import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { httpClient } from '@/api/httpClient';
import { endpoints } from '@/api/endpoint';
import { ComplianceData } from '@/@types/compliance';
import httpClient from '@/api/http-client';
// import type { CommonCompanyData } from './CommonService';

export interface ComplianceState {
    data: ComplianceData[];
    loading: boolean;
}

const initialState: ComplianceState = {
    data: [],
    loading: false,
};

export const fetchAll = createAsyncThunk(
    'common/fetchAll',
    async () => {
            const { data } = await httpClient.get(endpoints.compliance.getAll());
            return data;
        
    }
);

const commonSlice = createSlice({
    name: 'compliance',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAll.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAll.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchAll.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const selectComplianceData = (state: { common: ComplianceState }) => state.common.data;
export const selectLoading = (state: { common: ComplianceState }) => state.common.loading;

export default commonSlice.reducer;