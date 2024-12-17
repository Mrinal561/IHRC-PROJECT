import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "@/api/http-client";
import { endpoints } from "@/api/endpoint";

// Define the type for Certificate data
export interface Certificate {
    id: string;
    // Add other certificate specific fields here
}

export interface CertificateState {
    certificates: Certificate[];
    loading: boolean;
    error: string | null;
    downloadStatus: {
        loading: boolean;
        error: string | null;
        success: boolean;
    };
}

const initialState: CertificateState = {
    certificates: [],
    loading: false,
    error: null,
    downloadStatus: {
        loading: false,
        error: null,
        success: false
    }
};

// Create async thunk for fetching certificates list
export const fetchCertificates = createAsyncThunk(
    'certificate/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await httpClient.get(endpoints.certificate.list());
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch certificates');
        }
    }
);

// Create async thunk for downloading certificate
export const downloadCertificate = createAsyncThunk(
    'certificate/download',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await httpClient.get(endpoints.certificate.certificateDownload(id), {
                responseType: 'blob', // Important for file download
                headers: {
                    'Accept': 'application/vnd.ms-excel' // Specify we're expecting an Excel file
                }
            });
            
            // Create a URL for the blob with Excel MIME type
            const url = window.URL.createObjectURL(new Blob([response.data], {
                type: 'application/vnd.ms-excel'
            }));
            const link = document.createElement('a');
            link.href = url;
            
            // Get filename from header or use default
            const contentDisposition = response.headers['content-disposition'];
            let filename = 'certificate.xls'; // default filename for Excel
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="(.+)"/);
                if (filenameMatch.length === 2) filename = filenameMatch[1];
            }
            
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
            
            return true; // Indicate successful download
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to download certificate');
        }
    }
);

const certificateSlice = createSlice({
    name: 'certificate',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        resetDownloadStatus: (state) => {
            state.downloadStatus = {
                loading: false,
                error: null,
                success: false
            };
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Certificates Cases
            .addCase(fetchCertificates.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCertificates.fulfilled, (state, action) => {
                state.loading = false;
                state.certificates = action.payload;
            })
            .addCase(fetchCertificates.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Download Certificate Cases
            .addCase(downloadCertificate.pending, (state) => {
                state.downloadStatus.loading = true;
                state.downloadStatus.error = null;
                state.downloadStatus.success = false;
            })
            .addCase(downloadCertificate.fulfilled, (state) => {
                state.downloadStatus.loading = false;
                state.downloadStatus.success = true;
            })
            .addCase(downloadCertificate.rejected, (state, action) => {
                state.downloadStatus.loading = false;
                state.downloadStatus.error = action.payload as string;
                state.downloadStatus.success = false;
            });
    },
});

export const {
    clearError,
    resetDownloadStatus
} = certificateSlice.actions;

export default certificateSlice.reducer;