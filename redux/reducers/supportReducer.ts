import { createSlice } from "@reduxjs/toolkit";
import {
  createTicket,
  getUserTickets,
  getTicketDetails,
  addReply,
} from "../actions/supportActions";

interface SupportState {
  tickets: any[];
  currentTicket: any | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: SupportState = {
  tickets: [],
  currentTicket: null,
  loading: false,
  error: null,
  success: false,
};

const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {
    clearSupportErrors: (state) => {
      state.error = null;
    },
    resetSupportSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Ticket
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets.unshift(action.payload);
        state.success = true;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get User Tickets
      .addCase(getUserTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(getUserTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get Ticket Details
      .addCase(getTicketDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTicketDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTicket = action.payload;
      })
      .addCase(getTicketDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add Reply
      .addCase(addReply.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReply.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTicket = action.payload;
      })
      .addCase(addReply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearSupportErrors, resetSupportSuccess } = supportSlice.actions;
export const supportReducer = supportSlice.reducer;
