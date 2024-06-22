import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//Initial State
const initialState = {
  id: 0,
  email: "",
  authenticated: false,
};

//User interface
interface User {
  id: number;
  email: string;
  authenticated: boolean;
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.authenticated = action.payload.authenticated;
    },
    logout: (state) => {
      state.id = 0;
      state.email = "";
      state.authenticated = false;
    },
  },
});

//Exporta Actions
export const { setUser, logout } = userSlice.actions;

//Exporta el Reducer
export default userSlice.reducer;
