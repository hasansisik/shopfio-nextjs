import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { server } from "@/config";

// Create Ticket
export const createTicket = createAsyncThunk(
  "support/createTicket",
  async (ticketData: { subject: string; category: string; message: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${server}/support`, ticketData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      toast.success("Destek talebiniz başarıyla oluşturuldu.");
      return data.ticket;
    } catch (error: any) {
      const message = error.response?.data?.message || "Talep oluşturulurken bir hata oluştu";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Get User Tickets
export const getUserTickets = createAsyncThunk(
  "support/getUserTickets",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${server}/support`, {
        withCredentials: true,
      });
      return data.tickets;
    } catch (error: any) {
      const message = error.response?.data?.message || "Talepler yüklenirken bir hata oluştu";
      return rejectWithValue(message);
    }
  }
);

// Get Ticket Details
export const getTicketDetails = createAsyncThunk(
  "support/getTicketDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${server}/support/${id}`, {
        withCredentials: true,
      });
      return data.ticket;
    } catch (error: any) {
      const message = error.response?.data?.message || "Talep detayları alınamadı";
      return rejectWithValue(message);
    }
  }
);

// Add Reply
export const addReply = createAsyncThunk(
  "support/addReply",
  async ({ id, message }: { id: string; message: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${server}/support/${id}/reply`,
        { message },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success("Mesajınız iletildi.");
      return data.ticket;
    } catch (error: any) {
      const message = error.response?.data?.message || "Mesaj gönderilirken bir hata oluştu";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
