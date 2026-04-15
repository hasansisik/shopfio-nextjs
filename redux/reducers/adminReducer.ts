import { createReducer } from "@reduxjs/toolkit";
import {
  adminGetAllApplications,
  adminGetApplication,
  adminUpdateApplication,
  adminGetAllTickets,
  adminReplyTicket,
  adminGetSettings,
  adminUpdateSettings,
  adminGetStats
} from "../actions/adminActions";

interface AdminState {
  applications: any[];
  currentApplication: any | null;
  tickets: any[];
  settings: any | null;
  stats: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  applications: [],
  currentApplication: null,
  tickets: [],
  settings: null,
  stats: null,
  loading: false,
  error: null,
};

export const adminReducer = createReducer(initialState, (builder) => {
  builder
    // Get Applications
    .addCase(adminGetAllApplications.pending, (state) => {
      state.loading = true;
    })
    .addCase(adminGetAllApplications.fulfilled, (state, action) => {
      state.loading = false;
      state.applications = action.payload;
    })
    .addCase(adminGetAllApplications.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    
    // Update Application
    .addCase(adminUpdateApplication.fulfilled, (state, action) => {
      state.currentApplication = action.payload;
      const index = state.applications.findIndex(a => a._id === action.payload._id);
      if (index !== -1) {
        state.applications[index] = action.payload;
      }
    })

    // Get Single Application
    .addCase(adminGetApplication.pending, (state) => {
      state.loading = true;
    })
    .addCase(adminGetApplication.fulfilled, (state, action) => {
      state.loading = false;
      state.currentApplication = action.payload;
    })
    .addCase(adminGetApplication.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    // Get Tickets
    .addCase(adminGetAllTickets.pending, (state) => {
      state.loading = true;
    })
    .addCase(adminGetAllTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.tickets = action.payload;
    })
    .addCase(adminGetAllTickets.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })

    // Reply Ticket
    .addCase(adminReplyTicket.fulfilled, (state, action) => {
      const index = state.tickets.findIndex(t => t._id === action.payload._id);
      if (index !== -1) {
        state.tickets[index] = action.payload;
      }
    })

    // Get Settings
    .addCase(adminGetSettings.fulfilled, (state, action) => {
      state.settings = action.payload;
    })

    // Update Settings
    .addCase(adminUpdateSettings.fulfilled, (state, action) => {
      state.settings = action.payload;
    })
    
    // Get Stats
    .addCase(adminGetStats.pending, (state) => {
      state.loading = true;
    })
    .addCase(adminGetStats.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = action.payload;
    })
    .addCase(adminGetStats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
});
