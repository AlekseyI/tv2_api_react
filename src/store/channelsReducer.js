import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { channelsService } from "../services/api/channels";

const initialState = {
  loading: false,
  error: null,
  channels: null
};

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setChannels(state, action) {
      state.channels = action.payload;
    },
    resetState(state, action) {
      for (const item in initialState) {
        state[item] = initialState[item];
      }
    }
  }
});

export const { resetState, setLoading, setError, setChannels } = channelsSlice.actions;

export const selectChannels = (state) => state.channels;

export const resetStateChannels = createAsyncThunk(
  "channels/resetStateChannels",
  async (_, { dispatch }) => {
    try {
      dispatch(resetState());
    } catch (e) {
      console.log(e);
      dispatch(setError("Internal Error"));
    }
  }
);

export const getAllChannels = createAsyncThunk(
  "channels/getAllChannels",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await channelsService.getAll();
      if (!response.data.error) {
        dispatch(setChannels(response.data.groups));
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

export const getUrlChannel = createAsyncThunk(
  "channels/getUrlChannel",
  async (id, { dispatch }) => {
    try {
      const response = await channelsService.getUrlChannel(id);
      if (!response.data.error) {
        return response.data;
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
    }
    return null;
  }
);

export default channelsSlice.reducer;
