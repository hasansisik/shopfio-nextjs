import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { 
  adminGetCoupons, 
  adminCreateCoupon, 
  adminDeleteCoupon, 
  validateCoupon,
  Coupon 
} from "../actions/couponActions";

interface CouponState {
  coupons: Coupon[];
  activeCoupon: {
    code: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    success: boolean;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: CouponState = {
  coupons: [],
  activeCoupon: null,
  loading: false,
  error: null,
};

const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {
    clearCouponError: (state) => {
      state.error = null;
    },
    removeActiveCoupon: (state) => {
      state.activeCoupon = null;
    }
  },
  extraReducers: (builder) => {
    // Admin Get Coupons
    builder.addCase(adminGetCoupons.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(adminGetCoupons.fulfilled, (state, action: PayloadAction<{ coupons: Coupon[] }>) => {
      state.loading = false;
      state.coupons = action.payload.coupons;
    });
    builder.addCase(adminGetCoupons.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Admin Create Coupon
    builder.addCase(adminCreateCoupon.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(adminCreateCoupon.fulfilled, (state, action: PayloadAction<{ coupon: Coupon }>) => {
      state.loading = false;
      state.coupons.unshift(action.payload.coupon);
    });
    builder.addCase(adminCreateCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Admin Delete Coupon
    builder.addCase(adminDeleteCoupon.fulfilled, (state, action: PayloadAction<string>) => {
      state.coupons = state.coupons.filter(c => c._id !== action.payload);
    });

    // Validate Coupon (User)
    builder.addCase(validateCoupon.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(validateCoupon.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.activeCoupon = {
        code: action.payload.code,
        discountType: action.payload.discountType,
        discountValue: action.payload.discountValue,
        success: true
      };
    });
    builder.addCase(validateCoupon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.activeCoupon = null;
    });
  },
});

export const { clearCouponError, removeActiveCoupon } = couponSlice.actions;
export default couponSlice.reducer;
