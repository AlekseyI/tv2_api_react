import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { moviesService } from "../services/api/movies";
import { GlobalUtils } from "../utils/global";

const initialState = {
  loading: false,
  error: null,
  movies: null,
  totalPages: 0,
  page: 1
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setMovies(state, action) {
      state.movies = action.payload;
    },
    setAddMovies(state, action) {
      state.movies.rows = [...state.movies.rows, ...action.payload];
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    }
  }
});

export const {
  setLoading,
  setError,
  setMovies,
  setTotalPages,
  setAddMovies,
  setPage
} = moviesSlice.actions;

export const selectMovies = (state) => state.movies;

export const getBest = createAsyncThunk(
  "movies/getBest",
  async ({ page, limit, isAdd }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await moviesService.getBest(page, limit);

      if (response && response.data) {
        if (!response.data.error) {
          if (isAdd) {
            dispatch(setAddMovies(response.data.rows));
          } else {
            dispatch(setMovies(response.data));
          }
          dispatch(
            setTotalPages(
              GlobalUtils.getPagesByCountAndLimit(response.data.total, limit)
            )
          );
          dispatch(setPage(response.data.page));
        } else {
          dispatch(setError(response.data.error));
        }
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
  }
);

export const getMoviesByName = createAsyncThunk(
  "movies/getMoviesByName",
  async ({ name, page, limit, isAdd }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await moviesService.findByName(name, page, limit);

      if (!response.data.error) {
        if (isAdd) {
          dispatch(setAddMovies(response.data.rows));
        } else {
          dispatch(setMovies(response.data));
        }
        dispatch(
          setTotalPages(
            GlobalUtils.getPagesByCountAndLimit(response.data.total, limit)
          )
        );
        dispatch(setPage(response.data.page));
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

export const getMovieInfo = createAsyncThunk(
  "movies/getMoviesByName",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await moviesService.getInfo(id);

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

export const getUrlMovie = createAsyncThunk(
  "movies/getUrlMovie",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await moviesService.getUrlMovie(id);

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

export default moviesSlice.reducer;