import { configureStore } from "@reduxjs/toolkit";
import tableSlice from "./slices/table";

export default configureStore({
  reducer: {
    tableSlice: tableSlice,
  },
});
