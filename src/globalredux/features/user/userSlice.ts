// Import necessary dependencies
"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/globalredux/store";

// Define the shape of user data
export interface UserData {
  nama: string;
  phone: string;
  password: string;
}

// Define the shape of user state
export interface UserState {
  user: UserData;
}

// Define initial state for user
const initialState: UserState = {
  user: {
    nama: "",
    phone: "",
    password: "",
  },
};

// Create a slice for user actions and reducer
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reducer function to edit user data
    editUser: (state, action: PayloadAction<Partial<UserData>>) => {
      // Merge the incoming data with the existing user data
      state.user = { ...state.user, ...action.payload };
    },
  },
});

// Extract action creators from the slice
export const { editUser } = userSlice.actions;

// Selector function to retrieve user data from the state
export const selectCount = (state: RootState) => state.user.user;

// Export the reducer function
export default userSlice.reducer;
