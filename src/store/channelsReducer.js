import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { channelsService } from "../services/api/channels";

const initialState = {
  loading: false,
  error: null,
  channels: null,
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
  },
});

export const { setLoading, setError, setChannels } = channelsSlice.actions;

export const selectChannels = (state) => state.channels;

export const getAllChannels = createAsyncThunk(
  "channels/getAllChannels",
  async (isLocalIfExists, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      let response;
      const localChannels = localStorage.getItem("@channels");

      if (localChannels && isLocalIfExists) {
        try {
          response = JSON.parse(localChannels);
          if (response.error) {
            response = (await channelsService.getAll()).data;
          }
        } catch (e) {
          response = (await channelsService.getAll()).data;
        }
      } else {
        response = (await channelsService.getAll()).data;
      }

      if (!response.error) {
        dispatch(setChannels(response));
        localStorage.setItem("@channels", JSON.stringify(response));
      } else {
        dispatch(setError(response.error));
      }
    } catch (e) {
      console.log(e);
      if (axios.isAxiosError(e) && e.response) {
        dispatch(setError(e.response.data.error));
      } else {
        dispatch(setError("unknown error"));
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
      dispatch(setLoading(true));
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
        dispatch(setError("unknown error"));
      }
    } finally {
      dispatch(setLoading(false));
    }
    return null;
  }
);

export default channelsSlice.reducer;
