import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import channelsReducer from "./channelsReducer";
import moviesReducer from "./moviesReducer";
import settingsReducer from "./settingsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  channels: channelsReducer,
  movies: moviesReducer,
  settings: settingsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
