import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        authToken: false,
        user: null, // Stores user data
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            //   state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        },
        // signupSuccess: (state, action) => {
        //   state.user = action.payload;
        // },
    },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;