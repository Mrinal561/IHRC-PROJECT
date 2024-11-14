import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoints } from "@/api/endpoint";
import httpClient from "@/api/http-client";

export interface BranchData {
    group_id: number;
    company_id: number;
    state_id: number;
    district: string;
    location: string;
    name: string;
    opening_date: string;
    head_count: string;
    address: string;
    type: string;
    office_type: string;
    custom_data: {
      remark: string;
      status: string;
      email?: string;
      mobile?: string;
    };
    register_number: string;
    status: string;
    validity: string;
    document?: string;
}

export interface BranchState
{
    branch: BranchData[];
    loading:boolean;
    error: string | null;
    createBranch: BranchData | null
}


const initialState: BranchState = {
    branch: [],
    loading:false,
    error: null,
    createBranch: null,
}


export const fetchBranches = createAsyncThunk(
    'branch/fetchBranches',
    async (param: any) => {

        const { data } = await httpClient.get(endpoints.branch.getAll(), {
          params: param,
        });
        return data;
      }
  );
  
  export const createBranch = createAsyncThunk(
    'branch/createBranch',
    async (branchData: BranchData, { rejectWithValue }) => {
        try{
            const { data } = await httpClient.post(endpoints.branch.create(), branchData);
            return data;
        }
        catch (error: any) {
        return rejectWithValue(error.response?.data?.message || 'Failed to create branch');
        }
    }
  );
  
  export const updateBranch = createAsyncThunk(
    'branch/updateBranch',
    async ({ id, data }: { id: string; data: BranchData }) => {
        const response = await httpClient.put(endpoints.branch.update(id), data);
        return response.data;
    }
  );
  
  export const deleteBranch = createAsyncThunk(
    'branch/deleteBranch',
    async (id: string) => {
        console.log(id)
        await httpClient.delete(endpoints.branch.delete(id));
        return id;
       
    }
  );
  
  export const fetchBranchById = createAsyncThunk(
    'companyGroup/fetchCompanyGroupById',
    async (id: string) => {
      
        const { data } = await httpClient.get(endpoints.branch.getById(id));
        return data;
     
    }
  );
  
  const branchSlice = createSlice({
    name: 'branch',
    initialState,
    reducers: {
      setSelectedBranch: (branch, action) => {
        branch.createBranch = action.payload;
      },
      clearBranch: (branch) => {
        branch.createBranch = null;
      },
    },
    extraReducers: (builder) => {
      builder
        // Fetch All Company Groups
        .addCase(fetchBranches.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchBranches.fulfilled, (state, action) => {
          state.loading = false;
          state.branch = action.payload;
        })
        .addCase(fetchBranches.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Create Company Group
        .addCase(createBranch.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createBranch.fulfilled, (state, action) => {
          state.loading = false;
        })
        .addCase(createBranch.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Update Company Group
        .addCase(updateBranch.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateBranch.fulfilled, (state, action) => {
          state.loading = false;
        //   const index = state.companyGroups.findIndex((g) => g.id === action.payload.id);
        //   if (index !== -1) {
        //     state.companyGroups[index] = action.payload;
        //   }
        })
        .addCase(updateBranch.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Delete Company Group
        .addCase(deleteBranch.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteBranch.fulfilled, (state, action) => {
          state.loading = false;
        //   state.companyGroups = state.companyGroups.filter((g) => g.id !== action.payload);
        })
        .addCase(deleteBranch.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        })
        // Fetch Company Group by ID
        .addCase(fetchBranchById.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchBranchById.fulfilled, (state, action) => {
          state.loading = false;
        //   state.currentcompanyGroup = action.payload;
        })
        .addCase(fetchBranchById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export const { setSelectedBranch, clearBranch } = branchSlice.actions;
  export default branchSlice.reducer;