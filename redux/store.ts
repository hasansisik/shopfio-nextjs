// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { applicationReducer } from "./reducers/applicationReducer";
import { supportReducer } from "./reducers/supportReducer";
import { adminReducer } from "./reducers/adminReducer";
import couponReducer from "./reducers/couponReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    application: applicationReducer,
    support: supportReducer,
    admin: adminReducer,
    coupon: couponReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
