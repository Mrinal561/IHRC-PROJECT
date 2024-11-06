import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { httpClient } from '@/api/httpClient';
import { endpoints } from '@/api/endpoint'
import { BranchData } from '@/@types/branch'
import httpClient from '@/api/http-client'
// import type { CommonCompanyData } from './CommonService';

export interface BranchState {
    data: BranchData[]
    loading: boolean
}

const initialState: BranchState = {
    data: [],
    loading: false,
}

export const fetchAll = createAsyncThunk('common/fetchAll', async () => {
    const { data } = await httpClient.get(endpoints.branch.getAll())
    return data
})

const commonSlice = createSlice({
    name: 'branch',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAll.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchAll.fulfilled, (state, action) => {
                state.data = action.payload
                state.loading = false
            })
            .addCase(fetchAll.rejected, (state) => {
                state.loading = false
            })
    },
})

export const selectBranchData = (state: { common: BranchState }) =>
    state.common.data
export const selectLoading = (state: { common: BranchState }) =>
    state.common.loading

export default commonSlice.reducer
