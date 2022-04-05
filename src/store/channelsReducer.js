import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { channelsService } from "../services/api/channels";
import { ChannelsUtils } from "../utils/channels";

const initialState = {
  loading: false,
  error: null,
  channels: null,
  programmes: null
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
    setProgrammes(state, action) {
      if (!state.programmes)
      {
        state.programmes = {};
      }
      if (!state.programmes[action.payload.id])
      {
        state.programmes[action.payload.id] = {};
      }

      state.programmes[action.payload.id][action.payload.gmt] = action.payload.programmes;
      // if (state.programmes && state.programmes[action.payload.id]) {
      //   if (state.programmes[action.payload.id][action.payload.day])
      //   {
      //     state.programmes[action.payload.id][action.payload.day] = [...state.programmes[action.payload.id][action.payload.day], action.payload.programmes];
      //   }
      //   else
      //   {
      //     state.programmes[action.payload.id][action.payload.day] = action.payload.programmes;
      //   }
      // } else {
      //   state.programmes = {};
      //   state.programmes[action.payload.id] = action.payload.programmes;
      // }
    },
    resetState(state, action) {
      for (const item in initialState) {
        state[item] = initialState[item];
      }
    }
  }
});

export const { resetState, setLoading, setError, setChannels, setProgrammes } = channelsSlice.actions;

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
      dispatch(setError(null));
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
  async ({id, unix}, { dispatch }) => {
    try {
      dispatch(setError(null));
      const response = await channelsService.getUrl(id, unix);
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

export const getProgrammes = createAsyncThunk(
  "channels/getProgrammes",
  async ({ id, day, gmt }, { dispatch }) => {
    try {
      dispatch(setError(null));
      const response = await channelsService.getProgrammes(id, day);
      if (!response.data.error) {
        dispatch(setProgrammes({ id: id, programmes: response.data.epg, gmt: gmt }));
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

export const getChannel = createAsyncThunk(
  "channels/getChannel",
  async ({ channels, id }, { dispatch }) => {
    try {
      dispatch(setError(null));
      const channelInfo = ChannelsUtils.getChannelById(
        channels,
        id
      );
      if (channelInfo) {
        return channelInfo;
      } else {
        dispatch(setError("Channel not found"));
      }
    } catch (e) {
      console.log(e);
      dispatch(setError("Internal Error"));
    }
    return null;
  }
);

export default channelsSlice.reducer;
