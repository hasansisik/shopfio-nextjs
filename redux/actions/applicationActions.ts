import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base URL for the API
const API_URL = "http://localhost:3040/v1/applications";

export const createApplication = createAsyncThunk(
    "application/create",
    async (payload: { package: any, formData: any, paymentMethod: string }, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            };
            const { data } = await axios.post(API_URL, payload, config);
            return data.application;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
);

export const getUserApplications = createAsyncThunk(
    "application/list",
    async (_, { rejectWithValue }) => {
        try {
            const config = {
                withCredentials: true,
            };
            const { data } = await axios.get(API_URL, config);
            return data.applications;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
);

export const getApplicationDetails = createAsyncThunk(
    "application/details",
    async (id: string, { rejectWithValue }) => {
        try {
            const config = {
                withCredentials: true,
            };
            const { data } = await axios.get(`${API_URL}/${id}`, config);
            return data.application;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
);

export const uploadFile = createAsyncThunk(
    "application/upload",
    async (file: File, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            };
            const { data } = await axios.post(`${API_URL}/upload`, formData, config);
            return data.url;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message || error.message);
        }
    }
);
