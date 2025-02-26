// import { createSlice } from "@reduxjs/toolkit";

// export const articlesSlice = createSlice({
//   name: "articles",
//   initialState: {
//     articl: [],
//     loading: false,
//   },
//   reducers: {
//     addArticle: (state, action) => {
//       state.articl = [...state.articl, action.payload];
//     },
//     removeArticle: (state, action) => {
//       state.articl = state.articl.filter(
//         (article) => article.id !== action.payload
//       );
//     },
//     loadingArt: (state, action) => {
//       state.loading = action.payload;
//       // state.loading = [...state.loading, action.payload];
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { addArticle, removeArticle, loadingArt } = articlesSlice.actions;

// export default articlesSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

export const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    loading: false,
  },
  reducers: {
    addArticle: (state, action) => {
      state.articles = [action.payload, ...state.articles];
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    loadingArt: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// تصدير الدوال
export const { addArticle, setArticles, loadingArt } = articlesSlice.actions;
export default articlesSlice.reducer;
