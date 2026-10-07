import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const signup = createAsyncThunk("/auth/signup", async (signData) => {
  try {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Client Error (404). Not Found",
      showBar: true,
    };
  }
});

export const login = createAsyncThunk("/auth/login", async (loginData) => {    
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
      credentials: "include",
    });
    const data = await response.json();
    if (data.success) {
      const { content, success, message, showBar } = data;
      const result = {
        content: content,
        message: { success: success, message: message, showBar: showBar },
      };
      return result;
    } else return data;
  } catch (error) {
    return {
      success: false,
      message: "Client Error (404). Not Found",
      showBar: true,
    };
  }
});

export const authSlice = createSlice({
  name: "authSlice",
  initialState: { loading: false, message: null },
  reducers: {
    clearStates: (state) => {
      state.loading = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.message.success) {
          state.message = action.payload.message;
        } else {
          state.message = action.payload;
        }
      })
      .addMatcher(isAnyOf(signup.pending, login.pending), (state) => {
        state.loading = true;
        state.message = null;
      })
      .addMatcher(
        isAnyOf(signup.fulfilled, signup.rejected, login.rejected),
        (state, action) => {
          state.loading = false;
          state.message = action.payload;
        },
      );
  },
});

export default authSlice.reducer;
export const { clearStates } = authSlice.actions;
