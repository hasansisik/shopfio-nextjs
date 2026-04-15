import { createSlice } from "@reduxjs/toolkit";
import { 
    createApplication, 
    getUserApplications, 
    getApplicationDetails,
    getPublicSettings 
} from "../actions/applicationActions";

interface ApplicationState {
    applications: any[];
    currentApplication: any | null;
    loading: boolean;
    error: string | null;
    success: boolean;
    globalSettings: any | null;
}

const initialState: ApplicationState = {
    applications: [],
    currentApplication: null,
    loading: false,
    error: null,
    success: false,
    globalSettings: null
};

const applicationSlice = createSlice({
    name: "application",
    initialState,
    reducers: {
        clearErrors: (state) => {
            state.error = null;
        },
        resetSuccess: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Create Application
            .addCase(createApplication.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createApplication.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.applications.unshift(action.payload);
                state.currentApplication = action.payload;
            })
            .addCase(createApplication.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Get Applications
            .addCase(getUserApplications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserApplications.fulfilled, (state, action) => {
                state.loading = false;
                state.applications = action.payload;
            })
            .addCase(getUserApplications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Get Details
            .addCase(getApplicationDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getApplicationDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.currentApplication = action.payload;
            })
            .addCase(getApplicationDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Get Public Settings
            .addCase(getPublicSettings.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPublicSettings.fulfilled, (state, action) => {
                state.loading = false;
                state.globalSettings = action.payload;
            })
            .addCase(getPublicSettings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearErrors, resetSuccess } = applicationSlice.actions;
export const applicationReducer = applicationSlice.reducer;
