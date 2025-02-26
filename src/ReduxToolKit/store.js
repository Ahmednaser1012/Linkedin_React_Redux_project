import { configureStore } from "@reduxjs/toolkit";
import { Userslice } from "./userslice";
// import { articlesSlice } from "./articlesSlice";
import articlesReducer from "./articlesSlice";

const store = configureStore({
  reducer: {
    userState: Userslice.reducer,
    // articleState: articlesSlice.reducer,
    articles: articlesReducer,
  },
});

export default store;
