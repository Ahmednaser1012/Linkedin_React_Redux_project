import { createSlice } from "@reduxjs/toolkit";

export const Userslice = createSlice({
  name: "users",
  initialState: {
    user: null,
  },
  reducers: {
    signIN: (state, action) => {
      state.user = {
        uid: action.payload.uid,
        email: action.payload.email,
        displayName: action.payload.displayName,
        photoURL: action.payload.photoURL,
      }; // تخزين بيانات المستخدم
    },
    clearUser: (state) => {
      state.user = null; // مسح بيانات المستخدم عند تسجيل الخروج
    },
  },
});

// Action creators are generated for each case reducer function
export const { signIN, clearUser } = Userslice.actions;

export default Userslice.reducer;
