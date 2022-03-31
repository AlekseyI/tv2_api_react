import React from "react";
import { CardMedia, Grid, Link, Typography } from "@mui/material";
import styled from "styled-components";
import { baseService } from "../../services/api/base";

const CardMediaMovie = styled(CardMedia)`
  max-height: 400px;

  @media (max-width: 900px) {
    max-height: unset;
    max-width: 500px;
  }
`;

const MovieItem = ({ data }) => {
  return (
    <Grid
      item
      container
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
      xl={3}
      lg={4}
      md={5}
      xs={12}
    >
      <Grid item>
        <Link href={"/movies/" + data.id} underline="none" color="black">
          <Typography variant="h5">{data.name_orig}</Typography>
        </Link>
      </Grid>
      <Grid item>
        <Link href={"/movies/" + data.id} underline="none" color="black">
          <CardMediaMovie
            component="img"
            alt={data.name_orig}
            src={baseService.getImageUrl(data.poster)}
          />
        </Link>
      </Grid>
    </Grid>
  );
};

export default MovieItem;
