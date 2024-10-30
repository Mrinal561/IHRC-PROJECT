import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as UserService from '@/services/UserEntityService';
// import { UserData } from "@/@types/userEntity";
import httpClient from '@/api/http-client';
import { endpoints } from '@/api/endpoint';

export interface UserData {
    group_id: number;
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    username: string;
    joining_date: Date;
    role: string;
    aadhar_no: string;
    pan_card: string;
    auth_signatory: boolean;
    suspend: boolean;
    disable: boolean;
}

export interface UserState {
    users: UserData[];
    companyGroups: UserData[];
    loading: boolean;
    error: string | null;
    createUser: UserData | null;
}

const initialState: UserState = {
    users: [],
    companyGroups: [],
    loading: false,
    error: null,
    createUser: null,
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
            return rejectWithValue(error.response?.data?.message || 'Failed to create user');
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/update',
    async ({ id, data }: { id: string; data: Partial<UserData> }) => {
            const response = await httpClient.put(endpoints.user.update(id), data);
            return data ;
        
    }
);

export const deleteUser = createAsyncThunk(
    'user/delete',
    async (id: string) => {
            await UserService.deleteUser(id);
            return id;
       
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
                state.error = null;

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
                state.users = state.users.filter(user => user.group_id !== Number(action.payload));
            })
            .addCase(deleteUser.rejected, (state, action) => {
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