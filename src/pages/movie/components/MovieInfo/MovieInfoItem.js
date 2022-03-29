import React from "react";
import { Grid } from "@mui/material";

const MovieInfoItem = ({ name, children }) => {
  return (
    <Grid item container justifyContent="flex-start" alignItems="flex-start" columnSpacing={1}>
      <Grid item flexGrow={1}>
        {name}:
      </Grid>
      <Grid item md={10} sm={10} xs={9}>
        {children}
      </Grid>
    </Grid>
  );
};

export default MovieInfoItem;