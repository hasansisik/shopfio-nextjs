import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "@/config";

// Base URL for the applications API
const API_URL = `${server}/applications`;

export const createApplication = createAsyncThunk(
    "application/create",
    async (payload: { package: any, formData: any, paymentMethod: string }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return rejectWithValue("Giriş yapmanız gerekiyor");

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            };
            const { data } = await axios.post(API_URL, payload, config);
            return data.application;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getUserApplications = createAsyncThunk(
    "application/list",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return rejectWithValue("Giriş yapmanız gerekiyor");

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            };
            const { data } = await axios.get(API_URL, config);
            return data.applications;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getApplicationDetails = createAsyncThunk(
    "application/details",
    async (id: string, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return rejectWithValue("Giriş yapmanız gerekiyor");

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            };
            const { data } = await axios.get(`${API_URL}/${id}`, config);
            return data.application;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const uploadFile = createAsyncThunk(
    "application/upload",
    async (file: File, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return rejectWithValue("Giriş yapmanız gerekiyor");

            const formData = new FormData();
            formData.append("file", file);
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            };
            const { data } = await axios.post(`${API_URL}/upload`, formData, config);
            return data.url;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const getPublicSettings = createAsyncThunk(
    "application/getSettings",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return rejectWithValue("Giriş yapmanız gerekiyor");

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            };
            const { data } = await axios.get(`${server}/auth/settings`, config);
            return data.settings;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const initTransfer = createAsyncThunk(
    "application/initTransfer",
    async (payload: { package: any }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            if (!token) return rejectWithValue("Giriş yapmanız gerekiyor");

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            };
            const { data } = await axios.post(`${API_URL}/init-transfer`, payload, config);
            return data.application;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);
