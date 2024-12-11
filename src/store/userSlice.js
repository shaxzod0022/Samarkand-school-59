import { createSlice } from "@reduxjs/toolkit";

export const userData = createSlice({
  name: "users",
  initialState: {
    value: null,
  },
  reducers: {
    createUsers: (item, action) => {
      item.value = action.payload;
    },
  },
});

export const { createUsers } = userData.actions;
export default userData.reducer;
