import React from "react";
import { Grid } from "@mui/material";
import styled from "styled-components";
import MovieInfoItem from "./MovieInfoItem";

const TextMovie = styled.span`
  font-weight: 200;
  font-size: 20px;

  //@media (max-width: 405px) {
  //  font-size: 16px;
  //}
`;

const MovieInfo = ({ film }) => {
  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="center"
      alignItems="flex-start"
      rowSpacing={1}
    >
      <MovieInfoItem name="Name">
        <TextMovie>{film.name}</TextMovie>
      </MovieInfoItem>
      <MovieInfoItem name="Description">
        <TextMovie>{film.description}</TextMovie>
      </MovieInfoItem>
      <MovieInfoItem name="Country">
        <TextMovie>{film.country}</TextMovie>
      </MovieInfoItem>
      <MovieInfoItem name="Year">
        <TextMovie>{film.year}</TextMovie>
      </MovieInfoItem>
      <MovieInfoItem name="Actors">
        <TextMovie>{film.actors}</TextMovie>
      </MovieInfoItem>
      <MovieInfoItem name="Ratings">
        <Grid container
              justifyContent="flex-start"
              alignItems="center"
              columnSpacing={2}>
          <Grid item>
            <TextMovie>imdb: {film.rate_imdb}</TextMovie>
          </Grid>
          <Grid item>
            <TextMovie>kinopoisk: {film.rate_kinopoisk}</TextMovie>
          </Grid>
          <Grid item>
            <TextMovie>mpaa: {film.rate_mpaa}</TextMovie>
          </Grid>
        </Grid>
      </MovieInfoItem>
    </Grid>
  );
};

export default MovieInfo;
