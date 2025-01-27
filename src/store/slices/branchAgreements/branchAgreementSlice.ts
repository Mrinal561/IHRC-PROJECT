import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { 
  getBranchAgreement, 
  getBranchAgreementById,
  createBranchAgreement,
  updateBranchAgreement,
  deleteBranchAgreement
} from '@/services/BranchAgreementService'
import { BranchAgreementData, BranchAgreementResponseData } from '@/@types/branchAgreement'
import httpClient from '@/api/http-client'
import { endpoints } from '@/api/endpoint'

export interface BranchAgreementState {
    agreements: BranchAgreementResponseData[]
    loading: boolean
    error: string | null
    selectedAgreement: BranchAgreementResponseData | null
}

const initialState: BranchAgreementState = {
    agreements: [],
    loading: false,
    error: null,
    selectedAgreement: null,
}

export const fetchBranchAgreements = createAsyncThunk(
    'branchAgreement/fetchAll',
    async (params: BranchAgreementData) => {
        const { data } = await httpClient.get(endpoints.branchAgreement.list(), {
            params: params,
        })
        return data
    }
)

export const fetchBranchAgreementById = createAsyncThunk(
    'branchAgreement/fetchById',
    async (id: string) => {
        const { data } = await httpClient.get(endpoints.branchAgreement.detail(id))
        return data
    }
)

export const createNewBranchAgreement = createAsyncThunk(
    'branchAgreement/create',
    async (agreementData: any, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.post(endpoints.branchAgreement.create(),
            agreementData,
        )
            return data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message)
        }
    }
)

export const updateExistingBranchAgreement = createAsyncThunk(
    'branchAgreement/update',
    async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
        try {
            // const response = await updateBranchAgreement(id, data)
            const response = await httpClient.put(endpoints.branchAgreement.update(id), data)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message)
        }
    }
)

export const deleteExistingBranchAgreement = createAsyncThunk(
    'branchAgreement/delete',
    async (id: string, { rejectWithValue }) => {
        try {
           const {data} =  await httpClient.delete(endpoints.branchAgreement.delete(id))
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message)
        }
    }
)

const branchAgreementSlice = createSlice({
    name: 'branchAgreement',
    initialState,
    reducers: {
        setSelectedAgreement: (state, action) => {
            state.selectedAgreement = action.payload
        },
        clearSelectedAgreement: (state) => {
            state.selectedAgreement = null
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch All Branch Agreements
            .addCase(fetchBranchAgreements.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchBranchAgreements.fulfilled, (state, action) => {
                state.loading = false
                // state.agreements = action.payload
            })
            .addCase(fetchBranchAgreements.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // Fetch Branch Agreement by ID
            .addCase(fetchBranchAgreementById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchBranchAgreementById.fulfilled, (state, action) => {
                state.loading = false
                // state.selectedAgreement = action.payload
            })
            .addCase(fetchBranchAgreementById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // Create Branch Agreement
            .addCase(createNewBranchAgreement.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createNewBranchAgreement.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(createNewBranchAgreement.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // Update Branch Agreement
            .addCase(updateExistingBranchAgreement.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateExistingBranchAgreement.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(updateExistingBranchAgreement.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // Delete Branch Agreement
            .addCase(deleteExistingBranchAgreement.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteExistingBranchAgreement.fulfilled, (state, action) => {
                state.loading = false
                state.agreements = state.agreements.filter(
                    (agreement) => agreement.id.toString() !== action.payload
                )
            })
            .addCase(deleteExistingBranchAgreement.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    },
})

export const { setSelectedAgreement, clearSelectedAgreement } = branchAgreementSlice.actions
export default branchAgreementSlice.reducer