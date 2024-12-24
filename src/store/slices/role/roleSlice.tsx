
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { endpoints } from '@/api/endpoint'
import httpClient from '@/api/http-client'
import { AxiosError } from 'axios'

// Define the interface for role data
export interface RoleData {
    id?: number | string;
    name: string;
    permissions?: string[];
    rolePermissions?: string[]; // Added for role permissions
}

// Define the state interface
export interface RoleState {
    loading: boolean;
    error: string | null;
    roles: RoleData[];
    currentRole: RoleData | null;
    rolePermissions: string[]; // Added to store role permissions
}

// Define interface for update payload
interface UpdateRolePayload {
    id: number | string;
    name: string;
}

// Initial state
const initialState: RoleState = {
    loading: false,
    error: null,
    roles: [],
    currentRole: null,
    rolePermissions: [] // Initialize role permissions array
}

// Initial form data
export const initialRoleFormData: RoleData = {
    name: '',
    permissions: [],
    rolePermissions: [] // Added rolePermissions to initial form data
}

// Create async thunk for updating role permissions
export const updateRolePermissions = createAsyncThunk(
    'role/updateRolePermissions',
    async ({ id, permissions }: { id: number | string, permissions: string[] }, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.post(
                endpoints.role.rolePermission(id),
                { permissions }
            )
            return data
        } catch (error: any) {
            const err = error as AxiosError<any>
            return rejectWithValue(err.response?.data?.message)
        }
    }
)

// Existing async thunks remain the same
export const fetchRoles = createAsyncThunk(
    'role/fetchRoles',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.get(
                endpoints.role.getAll()
            )
            return data
        } catch (error: any) {
            const err = error as AxiosError<any>
            return rejectWithValue(err.response?.data?.message)
        }
    }
)

export const fetchRoleById = createAsyncThunk(
    'role/fetchRoleById',
    async (id: number | string, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.get(
                endpoints.role.getById(id)
            )
            return data
        } catch (error: any) {
            const err = error as AxiosError<any>
            return rejectWithValue(err.response?.data?.message)
        }
    }
)

export const createRole = createAsyncThunk(
    'role/createRole',
    async (roleData: RoleData, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.post(
                endpoints.role.create(),
                roleData
            )
            return data
        } catch (error: any) {
            const err = error as AxiosError<any>
            return rejectWithValue(err.response?.data?.message)
        }
    }
)

export const updateRole = createAsyncThunk(
    'role/updateRole',
    async ({ id, name }: UpdateRolePayload, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.put(
                endpoints.role.update(id),
                { name }
            )
            return data
        } catch (error: any) {
            const err = error as AxiosError<any>
            return rejectWithValue(err.response?.data?.message)
        }
    }
)

export const deleteRole = createAsyncThunk(
    'role/deleteRole',
    async (id: number | string, { rejectWithValue }) => {
        try {
            await httpClient.delete(endpoints.role.delete(id))
            return id
        } catch (error: any) {
            const err = error as AxiosError<any>
            return rejectWithValue(err.response?.data?.message)
        }
    }
)

// Create the slice
const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        clearCurrentRole: (state) => {
            state.currentRole = null
        },
        clearError: (state) => {
            state.error = null
        },
        clearRoles: (state) => {
            state.roles = []
        },
        clearRolePermissions: (state) => { // Added reducer to clear role permissions
            state.rolePermissions = []
        }
    },
    extraReducers: (builder) => {
        builder
            // Update Role Permissions
            .addCase(updateRolePermissions.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateRolePermissions.fulfilled, (state, action) => {
                state.loading = false
                state.rolePermissions = action.payload
                // Update permissions in currentRole if it matches
                if (state.currentRole && 'id' in action.payload && state.currentRole.id === action.payload.id) {
                    state.currentRole = {
                        ...state.currentRole,
                        permissions: action.payload.permissions
                    }
                }
            })
            .addCase(updateRolePermissions.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // Fetch Roles
            .addCase(fetchRoles.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchRoles.fulfilled, (state, action) => {
                state.loading = false
                state.roles = action.payload
            })
            .addCase(fetchRoles.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // Fetch Role By ID
            .addCase(fetchRoleById.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchRoleById.fulfilled, (state, action) => {
                state.loading = false
                state.currentRole = action.payload
            })
            .addCase(fetchRoleById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // Create Role
            .addCase(createRole.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(createRole.fulfilled, (state, action) => {
                state.loading = false
                state.currentRole = action.payload
                // state.roles.push(action.payload)
            })
            .addCase(createRole.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // Update Role
            .addCase(updateRole.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(updateRole.fulfilled, (state, action) => {
                state.loading = false
                state.currentRole = action.payload
            })
            .addCase(updateRole.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
            // Delete Role
            .addCase(deleteRole.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(deleteRole.fulfilled, (state, action) => {
                state.loading = false
            })
            .addCase(deleteRole.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload as string
            })
    }
})

export const { clearCurrentRole, clearError, clearRoles, clearRolePermissions } = roleSlice.actions
export default roleSlice.reducer