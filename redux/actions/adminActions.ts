import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/config";

// Setup interceptor for admin routes if needed, but the global one in userActions should work

export const adminGetAllApplications = createAsyncThunk(
  "admin/getAllApplications",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/admin/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.applications;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const adminUpdateApplication = createAsyncThunk(
  "admin/updateApplication",
  async ({ id, payload }: { id: string; payload: any }, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.patch(`${server}/admin/applications/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.application;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const adminGetAllTickets = createAsyncThunk(
  "admin/getAllTickets",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/admin/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.tickets;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const adminReplyTicket = createAsyncThunk(
  "admin/replyTicket",
  async ({ id, message }: { id: string; message: string }, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.post(`${server}/admin/tickets/${id}/reply`, { message }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.ticket;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const adminGetSettings = createAsyncThunk(
  "admin/getSettings",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/admin/settings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.settings;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const adminUpdateSettings = createAsyncThunk(
  "admin/updateSettings",
  async (payload: any, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.patch(`${server}/admin/settings`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.settings;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const adminGetStats = createAsyncThunk(
  "admin/getStats",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.stats;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const adminGetApplication = createAsyncThunk(
  "admin/getApplication",
  async (id: string, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/admin/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.application;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const adminGetAllPurchases = createAsyncThunk(
  "admin/getAllPurchases",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${server}/admin/purchases`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data.purchases;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
