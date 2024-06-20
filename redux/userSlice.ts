import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//Initial State
const initialState = {
  email: "",
  contentCreator: false,
};

//User interface
interface User {
  email: string;
  contentCreator: boolean;
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.email = action.payload.email;
      state.contentCreator = action.payload.contentCreator;
    },
  },
});

//Exporta Actions
export const { setUser } = userSlice.actions;

//Exporta el Reducer
export default userSlice.reducer;
