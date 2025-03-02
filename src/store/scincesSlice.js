import { createSlice } from "@reduxjs/toolkit";

export const sciencesSlice = createSlice({
  name: "scince",
  initialState: {
    value: null,
  },
  reducers: {
    createScince: (item, action) => {
      item.value = action.payload;
    },
  },
});

export const { createScince } = sciencesSlice.actions;
export default sciencesSlice.reducer;
