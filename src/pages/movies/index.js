import React, { useEffect, useState } from "react";
import { Box, FormControl, Grid, TextField } from "@mui/material";
import GridItemsList from "../../components/GridItemsList";
import MovieItem from "../../components/MovieItem";
import { useDispatch, useSelector } from "react-redux";
import { getBest, getMoviesByName, resetStateMovies, selectMovies } from "../../store/moviesReducer";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDebouncedCallback } from "use-debounce";
import { useEventListener } from "../../hooks/useEventListener";
import InfoPage from "../info";

const MoviesPage = () => {
  const moviesState = useSelector(selectMovies);
  const dispatch = useDispatch();
  const [findQuery, setFindQuery] = useState("");
  const [viewPage, setViewPage] = useState(1);
  const [isAddNewPage, setIsAddNewPage] = useState(false);

  const moviesSchema = yup.object().shape({
    findQuery: yup.string()
  });

  const { register, control } = useForm({
    resolver: yupResolver(moviesSchema)
  });

  const changeFindQuery = useDebouncedCallback((value) => {
    setFindQuery(value);
  }, 250);

  useEffect(() => {

    return () => {
      dispatch(resetStateMovies());
    };
  }, []);

  useEventListener("scroll", () => {
    setIsAddNewPage(document.documentElement.scrollHeight -
      window.innerHeight -
      document.documentElement.scrollTop <=
      50);
  });

  useEffect(() => {
    if (isAddNewPage && !moviesState.loading && viewPage < moviesState.totalPages) {
      setIsAddNewPage(false);
      setViewPage(value => value + 1);
    }
  }, [isAddNewPage]);

  useEffect(() => {
    const params = {
      name: findQuery,
      page: viewPage,
      limit: 20,
      isAdd: viewPage > 1
    };
    if (findQuery) {
      dispatch(getMoviesByName(params));
    } else {
      dispatch(getBest(params));
    }
  }, [viewPage, findQuery]);

  return (
    <>
      {
        moviesState.loading && !moviesState.movies ? (
            <InfoPage>
              <h1>Loading...</h1>
            </InfoPage>
          ) :
          moviesState.error ? (
            <InfoPage>
              <h1>{moviesState.error.message}</h1>
            </InfoPage>
          ) : (
            <Grid
              container
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              mt={3}
            >
              <Grid item container justifyContent="center" alignItems="center">
                <Grid item xl={6} lg={6} md={8} sm={10} xs={12}>
                  <Controller
                    render={({ field, formState }) => (
                      <FormControl fullWidth>
                        <TextField
                          {...field}
                          {...register("findQuery", {
                            onChange: (e) => {
                              changeFindQuery(e.target.value);
                            }
                          })}
                          label="Find"
                          error={!!formState.errors?.findQuery}
                        />
                        <Box color="red">
                          {!!formState.errors?.findQuery?.message
                            ? formState.errors.findQuery.message
                            : null}
                        </Box>
                      </FormControl>
                    )}
                    name="findQuery"
                    control={control}
                    defaultValue={findQuery}
                  />
                </Grid>
              </Grid>
              <Grid
                item
                container
                justifyContent="center"
                alignItems="center"
                rowSpacing={3}
                mt={3}
                xl={10}
                lg={10}
                md={11}
              >
                <GridItemsList
                  items={moviesState.movies}
                  Element={MovieItem}
                />
              </Grid>
            </Grid>
          )
      }
    </>
  );
};

export default MoviesPage;