import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { httpClient } from "../services/httpClient/httpClient";
import { userService } from "../services/api/user";
import axios from "axios";

export const AUTH_LOGGED_IN = "logged in";
export const AUTH_NOT_LOGGED = "not logged";

const initialState = {
  loading: false,
  error: null,
  authenticationState: AUTH_NOT_LOGGED,
  sid: null,
  account: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setAuthenticationState(state, action) {
      state.authenticationState = action.payload;
    },
    setSid(state, action) {
      state.sid = action.payload;
      httpClient.setSid(action.payload);
    },
    setAccount(state, action) {
      state.account = action.payload;
    },
    resetState(state, action) {
      for (const item in initialState) {
        state[item] = initialState[item];
      }
    }
  }
});

export const {
  setLoading,
  setError,
  setAuthenticationState,
  setSid,
  setAccount,
  resetState
} = userSlice.actions;

export const selectUser = (state) => state.user;

export const resetStateUser = createAsyncThunk(
  "user/resetStateUser",
  async (_, { dispatch }) => {
    try {
      dispatch(resetState());
    } catch (e) {
      console.log(e);
      dispatch(setError("Internal Error"));
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ login, pass }, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await userService.login(login, pass);

      if (!response.data.error) {
        httpClient.setSid(response.data.sid);
        localStorage.setItem("@sid", response.data.sid);
        dispatch(setAccount(response.data.account));
        dispatch(setSid(response.data.sid));
        dispatch(setAuthenticationState(AUTH_LOGGED_IN));
      } else {
        localStorage.removeItem("@sid");
        dispatch(setSid(null));
        dispatch(setAuthenticationState(AUTH_NOT_LOGGED));
        dispatch(setError(response.data.error.message));
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        dispatch(setError(e.response.data.error));
      } else {
        console.log(e);
        dispatch(setError("Internal Error"));
      }
      localStorage.removeItem("@sid");
      dispatch(setSid(null));
      dispatch(setAuthenticationState(AUTH_NOT_LOGGED));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const account = createAsyncThunk(
  "user/account",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const ssid = localStorage.getItem("@sid");
      if (!ssid) {
        dispatch(setAuthenticationState(AUTH_NOT_LOGGED));
      } else {
        dispatch(setSid(ssid));

        dispatch(setAuthenticationState(AUTH_LOGGED_IN));
        const response = await userService.getAccount();
        if (!response.data.error) {
          dispatch(setAccount(response.data.account));
        } else {
          localStorage.removeItem("@sid");
          dispatch(setSid(null));
          dispatch(setAuthenticationState(AUTH_NOT_LOGGED));
          dispatch(setError(response.data.error.message));
        }
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        dispatch(setError(e.response.data.error));
      } else {
        console.log(e);
        dispatch(setError("Internal Error"));
      }
      localStorage.removeItem("@sid");
      dispatch(setSid(null));
      dispatch(setAuthenticationState(AUTH_NOT_LOGGED));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await userService.logout();
      if (response.data.error) {
        dispatch(setError(response.data.error.message));
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        dispatch(setError(e.response.data.error));
      } else {
        console.log(e);
        dispatch(setError("Internal Error"));
      }
    } finally {
      localStorage.removeItem("@sid");
      dispatch(setSid(null));
      dispatch(setAuthenticationState(AUTH_NOT_LOGGED));
      dispatch(setLoading(false));
    }
  }
);

export default userSlice.reducer;
