import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { settingsService } from "../services/api/settings";

const initialState = {
  loading: true,
  error: null,
  settings: null
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setSettings(state, action) {
      state.settings = action.payload;
    }
  }
});

export const {
  setLoading,
  setError,
  setSettings
} = settingsSlice.actions;

export const selectSettigs = (state) => state.settings;

export const getAllSettings = createAsyncThunk(
  "settings/getAllSettings",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await settingsService.getAll();
      if (!response.data.error) {
        dispatch(setSettings(response.data.settings));
      } else {
        dispatch(setError(response.data.error));
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        dispatch(setError(e.response.data.error));
      } else {
        console.log(e);
        dispatch(setError("Internal Error"));
      }
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const changeSetting = createAsyncThunk(
  "settings/changeSetting",
  async ({name, value}, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await settingsService.change(name, value);
      if (!response.data.error) {
        return true;
      } else {
        dispatch(setError(response.data.error));
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        dispatch(setError(e.response.data.error));
      } else {
        console.log(e);
        dispatch(setError("Internal Error"));
      }
    } finally {
      dispatch(setLoading(false));
    }
    return false;
  }
);


export default settingsSlice.reducer;