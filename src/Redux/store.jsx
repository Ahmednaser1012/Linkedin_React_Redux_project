// import { applyMiddleware, createStore } from "redux";
// import rootReducer from "./Reducers";
// // import { composeWithDevTools } from "redux-devtools-extension";
// import reduxThunk from "redux-thunk";

// export const store = createStore(rootReducer, applyMiddleware(reduxThunk));

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
