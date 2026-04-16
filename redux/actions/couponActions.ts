import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/config";

export interface Coupon {
  _id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  usageLimit: number | null;
  usedCount: number;
  isActive: boolean;
  expiresAt: string | null;
  applicablePackages: string[];
  createdAt: string;
}

export interface CreateCouponPayload {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  usageLimit?: number | null;
  expiresAt?: string | null;
  applicablePackages?: string[];
}

export const adminGetCoupons = createAsyncThunk(
  "coupon/adminGetCoupons",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${server}/admin/coupons`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || "Kuponlar getirilemedi");
    }
  }
);

export const adminCreateCoupon = createAsyncThunk(
  "coupon/adminCreateCoupon",
  async (payload: CreateCouponPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${server}/admin/coupons`, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || "Kupon oluşturulamadı");
    }
  }
);

export const adminDeleteCoupon = createAsyncThunk(
  "coupon/adminDeleteCoupon",
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${server}/admin/coupons/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || "Kupon silinemedi");
    }
  }
);

export const validateCoupon = createAsyncThunk(
  "coupon/validateCoupon",
  async (payload: { code: string; packageId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${server}/coupons/validate`, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.msg || "Geçersiz indirim kodu");
    }
  }
);
