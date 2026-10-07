import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { login } from "./authSlice";

export const verify = createAsyncThunk("/verify", async (showBar = false) => {
  try {
    const response = await fetch("http://localhost:8000/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: null,
      credentials: "include",
    });
    const data = await response.json();
    data.showBar = false;
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Client Error (404). Not Found",
      showBar: showBar,
    };
  }
});

export const logout = createAsyncThunk("/logout", async () => {
  try {
    const response = await fetch("http://localhost:8000/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: null,
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Client Error (404). Not Found",
      showBar: false,
    };
  }
});

export const updateUser = createAsyncThunk("/update", async (updateData) => {
  try {
    const response = await fetch("http://localhost:8000/user/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Client Error (404). Not Found",
      showBar: false,
    };
  }
});

export const addLink = createAsyncThunk("/addLink", async (newLink) => {
  try {
    const response = await fetch("http://localhost:8000/user/addLink", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLink),
      credentials: "include",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    return {
      success: false,
      message: "Client Error (404)",
      showBar: true,
    };
  }
});

export const editLink = createAsyncThunk("/addLink", async (updatedLink) => {
  try {
    const response = await fetch("http://localhost:8000/user/editLink", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedLink),
      credentials: "include",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    return {
      success: false,
      message: "Client Error (404)",
      showBar: true,
    };
  }
});

export const deleteLink = createAsyncThunk("/addLink", async (id) => {
  try {
    const response = await fetch("http://localhost:8000/user/deleteLink", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Client Error (404)",
      showBar: true,
    };
  }
});

export const userSlice = createSlice({
  name: "userSlice",
  initialState: { user: null, verifyMessage: null, loading: true },
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
    clearStates: (state) => {
      state.loading = false;
      state.verifyMessage = null;
    },
    setVerifyMessage: (state, action) => {
      state.verifyMessage = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(verify.pending, (state) => {
        state.loading = true;
      })

      .addCase(logout.fulfilled, (state, action) => {
        state.user = null;
        state.loading = false;
        state.verifyMessage = action.payload;
      })

      .addMatcher(
        isAnyOf(
          updateUser.fulfilled,
          updateUser.rejected,
          addLink.fulfilled,
          addLink.rejected,
        ),
        (state, action) => {
          if (!action.payload.success) {
            state.verifyMessage = action.payload;
            if (action.payload.destroy) {
              state.user = null;
            }
          } else {
            state.user = action.payload.content;
            state.verifyMessage = action.payload;
          }
        },
      )

      .addMatcher(
        isAnyOf(login.fulfilled, verify.fulfilled),
        (state, action) => {
          state.loading = false;

          const isSuccess =
            action.payload.success ||
            (action.payload.message && action.payload.message.success);
          if (isSuccess) {
            state.user = action.payload.content;

            if (action.type === verify.fulfilled.type) {
              state.verifyMessage = action.payload;
            }
          } else {
            state.user = null;
            if (action.type === verify.fulfilled.type) {
              state.verifyMessage = action.payload;
            }
          }
        },
      )

      .addMatcher(
        isAnyOf(verify.rejected, logout.rejected),
        (state, action) => {
          state.loading = false;
          state.user = null;
          if (action.type === verify.rejected.type) {
            state.verifyMessage = action.payload;
          }
        },
      );
  },
});

export default userSlice.reducer;
export const { clearUser, clearStates, setVerifyMessage } = userSlice.actions;
