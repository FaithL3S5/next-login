"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/globalredux/store";

export interface UserData {
  nama: string;
  phone: string;
  password: string;
}

export interface UserState {
  user: UserData;
}

const initialState: UserState = {
  user: {
    nama: "",
    phone: "",
    password: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    editUser: (state, action: PayloadAction<Partial<UserData>>) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { editUser } = userSlice.actions;

export const selectCount = (state: RootState) => state.user.user;

export default userSlice.reducer;
