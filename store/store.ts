import authReducer from "./Features/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import flightReducer from "./Features/flightInfoSlice";
import registerReducer from "./Features/registerSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    flightInfo: flightReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
