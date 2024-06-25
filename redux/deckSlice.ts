import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  deckName: "",
//   deckLength: 0,
  deckImage: "",
  creatorId: 0,
  cardsIds: []
};

export const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    setDeck: (state, action) => {
      state.id = action.payload.id;
      state.deckName = action.payload.deckName;
    //   state.deckLength = action.payload.deckLength;
      state.deckImage = action.payload.deckImage;
      state.creatorId = action.payload.creatorId;
    },
    resetDeck: (state) => {
      state.id = 0;
      state.deckName = "";
    //   state.deckLength = 0;
      state.deckImage = "";
      state.creatorId = 0;
    },
    setCardsIds: (state, action) => {
      state.cardsIds = action.payload
    }
  },
});

export const {setDeck, resetDeck, setCardsIds} = deckSlice.actions
export default deckSlice.reducer
