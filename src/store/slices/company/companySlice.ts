// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { CompanyData, CompanyResponseData } from '@/@types/company';
// // import { CompanyGroupData } from './companyGroupSlice'; // Import company group type
// import { endpoints } from "@/api/endpoint";
// import httpClient from "@/api/http-client";

// export interface CompanyState {
//     companies: CompanyResponseData[];
//     loading: boolean;
//     error: string | null;
//     currentCompany: CompanyResponseData | null;
//     companiesByGroup: Record<string, CompanyResponseData[]>;  // New state to organize companies by group
// }

// const initialState: CompanyState = {
//     companies: [],
//     loading: false,
//     error: null,
//     currentCompany: null,
//     companiesByGroup: {},  // Initialize empty group mapping
// };

// // Fetch companies by group ID
// export const fetchCompaniesByGroupId = createAsyncThunk(
//     'company/fetchCompaniesByGroupId',
//     async (groupId: string, { rejectWithValue }) => {
//         try {
//             const { data } = await httpClient.get(`${endpoints.company.getAll()}?group_id=${groupId}`);
//             return { groupId, companies: data };
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to fetch companies for group');
//         }
//     }
// );

// export const fetchCompanies = createAsyncThunk(
//     'company/fetchCompanies',
//     async (_, { rejectWithValue }) => {
//         try {
//             const { data } = await httpClient.get(endpoints.company.getAll());
//             return data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to fetch companies');
//         }
//     }
// );

// export const createCompany = createAsyncThunk(
//     'company/createCompany',
//     async (companyData: CompanyData, { rejectWithValue }) => {
//         try {
//             const { data } = await httpClient.post(endpoints.company.create(), companyData);
//             return data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to create company');
//         }
//     }
// );

// export const updateCompany = createAsyncThunk(
//     'company/updateCompany',
//     async ({ id, data }: { id: string; data: Partial<CompanyData> }, { rejectWithValue }) => {
//         try {
//             const response = await httpClient.put(endpoints.company.update(id), data);
//             return response.data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to update company');
//         }
//     }
// );

// export const deleteCompany = createAsyncThunk(
//     'company/deleteCompany',
//     async (id: string, { rejectWithValue }) => {
//         try {
//             await httpClient.delete(endpoints.company.delete(id));
//             return id;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to delete company');
//         }
//     }
// );

// export const fetchCompanyById = createAsyncThunk(
//     'company/fetchCompanyById',
//     async (id: string, { rejectWithValue }) => {
//         try {
//             const { data } = await httpClient.get(endpoints.company.getById(id));
//             return data;
//         } catch (error: any) {
//             return rejectWithValue(error.response?.data?.message || 'Failed to fetch company');
//         }
//     }
// );

// const companySlice = createSlice({
//     name: 'company',
//     initialState,
//     reducers: {
//         clearCurrentCompany: (state) => {
//             state.currentCompany = null;
//         },
//         clearError: (state) => {
//             state.error = null;
//         },
//         clearCompaniesByGroup: (state, action) => {
//             if (action.payload) {
//                 // Clear specific group
//                 delete state.companiesByGroup[action.payload];
//             } else {
//                 // Clear all groups
//                 state.companiesByGroup = {};
//             }
//         },
//     },
//     extraReducers: (builder) => {
//         builder
//             // Fetch Companies by Group ID
//             .addCase(fetchCompaniesByGroupId.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchCompaniesByGroupId.fulfilled, (state, action) => {
//                 state.loading = false;
//                 const { groupId, companies } = action.payload;
//                 state.companiesByGroup[groupId] = companies;
//             })
//             .addCase(fetchCompaniesByGroupId.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             // Fetch All Companies
//             .addCase(fetchCompanies.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchCompanies.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.companies = action.payload;
                
//                 // Organize companies by group_id
//                 state.companiesByGroup = action.payload.reduce((acc: Record<string, CompanyResponseData[]>, company: CompanyResponseData) => {
//                     if (!acc[company.group_id]) {
//                         acc[company.group_id] = [];
//                     }
//                     acc[company.group_id].push(company);
//                     return acc;
//                 }, {});
//             })
//             .addCase(fetchCompanies.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             // Create Company
//             .addCase(createCompany.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(createCompany.fulfilled, (state, action) => {
//                 state.loading = false;
//                 // if (action.payload) {
//                 //     // Add to companies array
//                 //     state.companies.push(action.payload);
//                 //     // Add to group mapping
//                 //     const groupId = action.payload.group_id;
//                 //     if (!state.companiesByGroup[groupId]) {
//                 //         state.companiesByGroup[groupId] = [];
//                 //     }
//                 //     state.companiesByGroup[groupId].push(action.payload);
//                 // }
//             })
//             .addCase(createCompany.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             // Update Company
//             .addCase(updateCompany.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(updateCompany.fulfilled, (state, action) => {
//                 state.loading = false;
//                 // if (action.payload) {
//                 //     // Update in companies array
//                 //     // const index = state.companies.findIndex((c) => c.id === action.payload.id);
//                 //     // if (index !== -1) {
//                 //     //     state.companies[index] = action.payload;
//                 //     // }
                    
//                 //     // Update in group mapping
//                 //     const groupId = action.payload.group_id;
//                 //     if (state.companiesByGroup[groupId]) {
//                 //         const groupIndex = state.companiesByGroup[groupId].findIndex(
//                 //             (c) => c.id === action.payload.id
//                 //         );
//                 //         if (groupIndex !== -1) {
//                 //             state.companiesByGroup[groupId][groupIndex] = action.payload;
//                 //         }
//                 //     }
//                 // }
//             })
//             .addCase(updateCompany.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             // Delete Company
//             .addCase(deleteCompany.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(deleteCompany.fulfilled, (state, action) => {
//                 state.loading = false;
//                 // const deletedCompany = state.companies.find(c => c.id === action.payload);
//                 // if (deletedCompany) {
//                 //     // Remove from companies array
//                 //     state.companies = state.companies.filter((c) => c.id !== action.payload);
                    
//                 //     // Remove from group mapping
//                 //     const groupId = deletedCompany.group_id;
//                 //     if (state.companiesByGroup[groupId]) {
//                 //         state.companiesByGroup[groupId] = state.companiesByGroup[groupId].filter(
//                 //             (c) => c.id !== action.payload
//                 //         );
//                 //     }
//                 // }
//             })
//             .addCase(deleteCompany.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             })
//             // Fetch Company by ID
//             .addCase(fetchCompanyById.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchCompanyById.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.currentCompany = action.payload;
//             })
//             .addCase(fetchCompanyById.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload as string;
//             });
//     },
// });

// export const { clearCurrentCompany, clearError, clearCompaniesByGroup } = companySlice.actions;
// export default companySlice.reducer;

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
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.get(endpoints.company.getAll());
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch companies');
        }
    }
);

export const createCompany = createAsyncThunk(
    'company/createCompany',
    async (companyData: CompanyData, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.post(endpoints.company.create(), companyData);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create company');
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