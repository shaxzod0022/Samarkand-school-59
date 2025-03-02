import { configureStore } from "@reduxjs/toolkit";
import scinceReducer from "./scincesSlice";
import userReduser from "./userSlice";

export default configureStore({
  reducer: {
    scinceData: scinceReducer,
    userData: userReduser,
  },
});
