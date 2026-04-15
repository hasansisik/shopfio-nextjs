// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { applicationReducer } from "./reducers/applicationReducer";
import { supportReducer } from "./reducers/supportReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    application: applicationReducer,
    support: supportReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
