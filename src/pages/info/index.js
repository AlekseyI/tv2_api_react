import React from "react";
import { Grid } from "@mui/material";

const InfoPage = ({ children }) => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item>{children}</Grid>
    </Grid>
  );
};

export default InfoPage;
