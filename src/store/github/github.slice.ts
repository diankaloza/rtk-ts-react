import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const LS_FAV_KEY = "reactfavouritekey";

interface I_GithubState {
  favoutites: string[];
}
const initialState: I_GithubState = {
  favoutites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? "[]"),
};

export const githubSlice = createSlice({
  name: "github",
  initialState,
  reducers: {
    addFavourite(state, action: PayloadAction<string>) {
      state.favoutites.push(action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favoutites));
    },
    removeFavourite(state, action: PayloadAction<string>) {
      state.favoutites.filter((f) => f !== action.payload);
    },
  },
});

export const githubActions = githubSlice.actions;
export const githubReducer = githubSlice.reducer;
