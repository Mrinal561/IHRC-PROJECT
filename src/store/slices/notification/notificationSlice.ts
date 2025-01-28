import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "@/api/http-client";
import { endpoints } from "@/api/endpoint";

// Define interfaces for the state
interface NotificationSettings {
    daysBeforeNotify: number;
    totalTimes: number;
    pushEnabled: boolean;
    emailEnabled: boolean;
}

interface Notification {
    id: string;
    // Add other notification properties as needed
}

export interface NotificationState {
    settings: NotificationSettings | null;
    unmarkedNotifications: Notification[];
    allNotifications: Notification[];
    loading: boolean;
    error: string | null;
}

const initialState: NotificationState = {
    settings: null,
    unmarkedNotifications: [],
    allNotifications: [],
    loading: false,
    error: null,
};

export const createNotificationSettings = createAsyncThunk(
    'notification/createSettings', 
    async (payload: any, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.post(
                endpoints.notification.notification(),
                payload 
            );
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create notification settings');
        }
    }
);

export const fetchUnmarkedNotifications = createAsyncThunk(
    'notification/fetchUnmarked',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.get(endpoints.notification.unmarkedlist());
            console.log(data)
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch unmarked notifications');
        }
    }
);

export const fetchAllNotifications = createAsyncThunk(
    'notification/fetchAll',
    async (params: { unchecked?: string }, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.get(endpoints.notification.allList(),{params});
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch all notifications');
        }
    }
);

export const markNotificationAsRead = createAsyncThunk(
    'notification/markAsRead',
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.post(endpoints.notification.markRead(id));
            return { id, data };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to mark notification as read');
        }
    }
);

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSettings: (state) => {
            state.settings = null;
        },
        clearNotifications: (state) => {
            state.unmarkedNotifications = [];
            state.allNotifications = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle createNotificationSettings
            .addCase(createNotificationSettings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createNotificationSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.settings = action.payload;
            })
            .addCase(createNotificationSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Handle fetchUnmarkedNotifications
            .addCase(fetchUnmarkedNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUnmarkedNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.unmarkedNotifications = action.payload;
            })
            .addCase(fetchUnmarkedNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Handle fetchAllNotifications
            .addCase(fetchAllNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.allNotifications = action.payload;
            })
            .addCase(fetchAllNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(markNotificationAsRead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(markNotificationAsRead.fulfilled, (state, action) => {
                state.loading = false;
                // Remove the marked notification from unmarkedNotifications array
                state.unmarkedNotifications = state.unmarkedNotifications.filter(
                    notification => notification.id !== action.payload.id
                );
                // Update the notification in allNotifications array if needed
                // This assumes the API returns updated notification data
                if (action.payload.data) {
                    state.allNotifications = state.allNotifications.map(notification =>
                        notification.id === action.payload.id ? { ...notification, ...action.payload.data } : notification
                    );
                }
            })
            .addCase(markNotificationAsRead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearError, clearSettings, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;