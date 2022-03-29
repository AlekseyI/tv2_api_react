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
    }
  }
});

export const { setLoading, setError, setChannels } = channelsSlice.actions;

export const selectChannels = (state) => state.channels;

const setChannelsOrError = (response, isLocalLoad, dispatch) => {
  if (!response.error) {
    dispatch(setChannels(isLocalLoad ? response : response.groups));
    localStorage.setItem("@channels", JSON.stringify(isLocalLoad ? response : response.groups));
  } else {
    dispatch(setError(response.error));
  }
};

export const getAllChannels = createAsyncThunk(
  "channels/getAllChannels",
  async (isLocalLoad, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      let response;
      const localChannels = localStorage.getItem("@channels");

      if (localChannels && isLocalLoad) {
        try {
          response = JSON.parse(localChannels);
          if (response.error) {
            response = await channelsService.getAll();
          }
        } catch (e) {
          response = await channelsService.getAll();
        }
      } else {
        response = await channelsService.getAll();
      }

      setChannelsOrError(isLocalLoad ? response : response.data, isLocalLoad, dispatch);

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
        console.log(e);
        dispatch(setError("Internal Error"));
      }
    } finally {
      dispatch(setLoading(false));
    }
    return null;
  }
);

export default channelsSlice.reducer;
