import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CompanyData, CompanyResponseData } from '@/@types/company';
import { endpoints } from "@/api/endpoint";
import httpClient from "@/api/http-client";



export interface CompanyState {
    companies: CompanyResponseData[];
    loading: boolean;
    error: string | null;
    currentCompany: CompanyResponseData | null;
    companiesByGroup: Record<string, CompanyResponseData[]>;
}

const initialState: CompanyState = {
    companies: [],
    loading: false,
    error: null,
    currentCompany: null,
    companiesByGroup: {},
};

export const fetchCompaniesByGroupId = createAsyncThunk(
    'company/fetchCompaniesByGroupId',
    async (groupId: string, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.get(`${endpoints.company.getAll()}?group_id=${groupId}`);
            return { groupId, companies: data };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch companies for group');
        }
    }
);

export const fetchCompanies = createAsyncThunk(
    'company/fetchCompanies',
    async (param:any) => {
       
            const { data } = await httpClient.get(endpoints.company.getAll(), {
                params: param,
              });
            return data;
       
    }
);

export const createCompany = createAsyncThunk(
    'company/createCompany',
    async (companyData: CompanyData, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.post(endpoints.company.create(), companyData);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateCompany = createAsyncThunk(
    'company/updateCompany',
    async ({ id, data }: { id: number; data: Partial<CompanyData> }, { rejectWithValue }) => {
        try {
            const response = await httpClient.put(endpoints.company.update(id), data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update company');
        }
    }
);

export const deleteCompany = createAsyncThunk(
    'company/deleteCompany',
    async (id: string, { rejectWithValue }) => {
        try {
            await httpClient.delete(endpoints.company.delete(id));
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete company');
        }
    }
);

export const fetchCompanyById = createAsyncThunk(
    'company/fetchCompanyById',
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.get(endpoints.company.getById(id));
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch company');
        }
    }
);

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        clearCurrentCompany: (state) => {
            state.currentCompany = null;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearCompaniesByGroup: (state, action) => {
            if (action.payload) {
                delete state.companiesByGroup[action.payload];
            } else {
                state.companiesByGroup = {};
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompaniesByGroupId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompaniesByGroupId.fulfilled, (state, action) => {
                state.loading = false;
                const { groupId, companies } = action.payload;
                state.companiesByGroup[groupId] = companies;
            })
            .addCase(fetchCompaniesByGroupId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchCompanies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompanies.fulfilled, (state, action) => {
                state.loading = false;
                state.companies = action.payload;
                // state.companiesByGroup = action.payload.reduce((acc: Record<string, CompanyResponseData[]>, company: CompanyResponseData) => {
                //     if (!acc[company.group_id]) {
                //         acc[company.group_id] = [];
                //     }
                //     acc[company.group_id].push(company);
                //     return acc;
                // }, {});
            })
            .addCase(fetchCompanies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCompany.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(updateCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCompany.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deleteCompany.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCompany.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteCompany.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchCompanyById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompanyById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentCompany = action.payload;
            })
            .addCase(fetchCompanyById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearCurrentCompany, clearError, clearCompaniesByGroup } = companySlice.actions;
export default companySlice.reducer;