import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '@/api/endpoint';
import { CommonCompanyData, CommonStateData } from '@/@types/commonApi';
import httpClient from '@/api/http-client';

interface CommonState {
    data: CommonCompanyData[];
    loading: boolean;
}

const initialState: CommonState = {
    data: [],
    loading: false,
};

export const fetchAll = createAsyncThunk(
    'common/fetchAll',
    async () => {
            const { data } = await httpClient.get(endpoints.common.getAll());
            return data;
        
    }
);

export const fetchAllStates = createAsyncThunk(
    'common/fetchAllStates',
    async () => {
        const { data } = await httpClient.get(endpoints.common.state());
        return data;
    }
)

const commonSlice = createSlice({
    name: 'common',
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
            })

            // for state
            .addCase(fetchAllStates.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllStates.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchAllStates.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const selectCommonData = (state: { common: CommonState }) => state.common.data;
export const selectLoading = (state: { common: CommonState }) => state.common.loading;

export default commonSlice.reducer;