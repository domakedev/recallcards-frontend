import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import  userReducer  from "./userSlice";

//Persist
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import tokenMiddleware from "./middleware";

// configure which key we want to persist
const authPersistConfig = {
  key: "auth",
  storage: storage,
};

const rootReducer = combineReducers({
  user: persistReducer(authPersistConfig, userReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(tokenMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
