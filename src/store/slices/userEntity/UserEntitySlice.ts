import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as UserService from '@/services/UserEntityService';
// import { UserData } from "@/@types/userEntity";
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';
import { UserData } from '@/@types/userEntity';
import { AxiosError } from 'axios';

export interface UserState {
    users: UserData[];
    companyGroups: UserData[];
    loading: boolean;
    error: string | null;
    createUser: UserData | null;
    selectedUser: UserData | null;
    userPermissions: string[];
}

const initialState: UserState = {
    users: [],
    companyGroups: [],
    loading: false,
    error: null,
    createUser: null,
    selectedUser: null,
    userPermissions: [],
};




export const fetchUsers = createAsyncThunk(
    'user/fetchAll',
    async () => {
            const { data } = await httpClient.get(endpoints.user.getAll());
            return data ;
       
    }
);

export const createUser = createAsyncThunk(
    'user/create',
    async (userData: UserData, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.post(endpoints.user.create(), userData);
            return data;
        } catch (error: any) {
            const err = error as AxiosError<any>

            return rejectWithValue(err.response?.data?.message || 'Failed to create user');
        }
    }
);

export const updateUserPermissions = createAsyncThunk(
    'user/updateUserPermissions',
    async ({ id, permissions }: { id: string, permissions: string[] }, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.post(
                endpoints.user.updatePermission(id),
                { permissions }
            );
            return data;
        } catch (error: any) {
            const err = error as AxiosError<any>
            return rejectWithValue(err.response?.data?.message || 'Failed to update user permissions');
        }
    }
);


export const updateUser = createAsyncThunk(
    'user/update',
    async ({ id, data }: { id: string; data: Partial<UserData> }, {rejectWithValue}) => {
           try{
               const response = await httpClient.put(endpoints.user.update(id), data);
               return response.data ;
           }
           catch (error: any) {
            const err = error as AxiosError<any>

            return rejectWithValue(err.response?.data?.message || 'Failed to update user');
           }
        
    }
);

export const deleteUser = createAsyncThunk(
    'user/delete',
    async (id: string, {rejectWithValue}) => {
        try{
           const {data} = await httpClient.delete(endpoints.user.delete(id))
           return data;
        } catch (error: any) {
            const err = error as AxiosError<any>

            return rejectWithValue(err.response?.data?.message);
        }
            
    }
);


export const fetchUserById = createAsyncThunk(
    'user/fetchById',
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.get(endpoints.user.getById(id));
            return data;
        } catch (error: any) {
            const err = error as AxiosError<any>
            return rejectWithValue(err.response?.data?.message || 'Failed to fetch user');
        }
    }
);
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.createUser = action.payload;
        },
        clearSelectedUser: (state) => {
            state.createUser = null;
        },
    },
    extraReducers: (builder) => {
        builder
       
            // Fetch users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create user
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                // state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Update user
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // .addCase(updateUser.fulfilled, (state, action) => {
            //     state.loading = false;
            //     const index = state.users.findIndex(user => user.id === action.payload.id);
            //     if (index !== -1) {
            //         state.users[index] = action.payload;
            //     }
            // })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Delete user
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                // state.users = state.users.filter(user => user.group_id !== Number(action.payload));
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedUser = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.selectedUser = null;
            })
            .addCase(updateUserPermissions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserPermissions.fulfilled, (state, action) => {
                state.loading = false;
                state.userPermissions = action.payload.permissions;
            })
            .addCase(updateUserPermissions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setSelectedUser, clearSelectedUser } = userSlice.actions;

export const selectUsers = (state: { user: UserState }) => state.user.users;
export const selectLoading = (state: { user: UserState }) => state.user.loading;
export const selectError = (state: { user: UserState }) => state.user.error;
export const selectSelectedUser = (state: { user: UserState }) => state.user.createUser;

export default userSlice.reducer;