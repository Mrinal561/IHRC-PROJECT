// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { endpoints } from '@/api/endpoint';
// import httpClient from '@/api/http-client';
// import { ComplianceAssignmentData } from '@/@types/assignedCompliance';

// export interface ComplianceAssignmentState {
//     data: ComplianceAssignmentData[];
//     loading: boolean;
// }

// const initialState: ComplianceAssignmentState = {
//     data: [],
//     loading: false,
// };

// export const fetchAllComplianceAssignments = createAsyncThunk(
//     'complianceAssignment/fetchAll',
//     async () => {
//         const { data } = await httpClient.get(endpoints.assign.getAll());
//         return data;
//     }
// );


// const complianceAssignmentSlice = createSlice({
//     name: 'complianceAssignment',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchAllComplianceAssignments.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchAllComplianceAssignments.fulfilled, (state, action) => {
//                 state.data = action.payload;
//                 state.loading = false;
//             })
//             .addCase(fetchAllComplianceAssignments.rejected, (state) => {
//                 state.loading = false;
//             });
//     },
// });

// export const selectComplianceAssignmentData = (state: { complianceAssignment: ComplianceAssignmentState }) =>
//     state.complianceAssignment.data;
// export const selectComplianceAssignmentLoading = (state: { complianceAssignment: ComplianceAssignmentState }) =>
//     state.complianceAssignment.loading;

// export default complianceAssignmentSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { endpoints } from '@/api/endpoint';
import httpClient from '@/api/http-client';
import { ComplianceAssignmentData } from '@/@types/assignedCompliance';

export type ApproverOwnerAssignedCompliances = {
    owner_id: number;
    approver_id: number;
    assigned_compliance_id: number[]; 
}

export interface ComplianceAssignmentState {
    data: ComplianceAssignmentData[];
    loading: boolean;
    updateLoading: boolean;
    updateError: string | null;
    updateSuccess: boolean;
}

const initialState: ComplianceAssignmentState = {
    data: [],
    loading: false,
    updateLoading: false,
    updateError: null,
    updateSuccess: false,
};

export const fetchAllComplianceAssignments = createAsyncThunk(
    'complianceAssignment/fetchAll',
    async () => {
        const { data } = await httpClient.get(endpoints.assign.getAll());
        return data;
    }
);

export const updateApproverOwner = createAsyncThunk(
    'complianceAssignment/updateApproverOwner',
    async ({ id, data }: { id: string; data: ApproverOwnerAssignedCompliances }) => {
        const response = await httpClient.put(endpoints.assign.update(), data);
        return response.data;
    }
);

const complianceAssignmentSlice = createSlice({
    name: 'complianceAssignment',
    initialState,
    reducers: {
        resetUpdateStatus: (state) => {
            state.updateError = null;
            state.updateSuccess = false;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch all cases
            .addCase(fetchAllComplianceAssignments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllComplianceAssignments.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchAllComplianceAssignments.rejected, (state) => {
                state.loading = false;
            })
            // Update approver/owner cases
            .addCase(updateApproverOwner.pending, (state) => {
                state.updateLoading = true;
                state.updateError = null;
                state.updateSuccess = false;
            })
            .addCase(updateApproverOwner.fulfilled, (state, action) => {
                // Update the specific compliance in the data array
                const updatedCompliance = action.payload;
                // const index = state.data.findIndex(item => item.id === updatedCompliance.id);
                // if (index !== -1) {
                //     state.data[index] = updatedCompliance;
                // }
                state.updateLoading = false;
                state.updateSuccess = true;
            })
            .addCase(updateApproverOwner.rejected, (state, action) => {
                state.updateLoading = false;
                state.updateError = action.error.message || 'Update failed';
                state.updateSuccess = false;
            });
    },
});

export const { resetUpdateStatus } = complianceAssignmentSlice.actions;

// Existing selectors
export const selectComplianceAssignmentData = (state: { complianceAssignment: ComplianceAssignmentState }) =>
    state.complianceAssignment.data;
export const selectComplianceAssignmentLoading = (state: { complianceAssignment: ComplianceAssignmentState }) =>
    state.complianceAssignment.loading;

// New selectors for update status
export const selectUpdateLoading = (state: { complianceAssignment: ComplianceAssignmentState }) =>
    state.complianceAssignment.updateLoading;
export const selectUpdateError = (state: { complianceAssignment: ComplianceAssignmentState }) =>
    state.complianceAssignment.updateError;
export const selectUpdateSuccess = (state: { complianceAssignment: ComplianceAssignmentState }) =>
    state.complianceAssignment.updateSuccess;

export default complianceAssignmentSlice.reducer;