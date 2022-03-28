import React from "react";
import { Grid } from "@mui/material";

const ErrorPage = ({ children }) => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item>{children}</Grid>
    </Grid>
  );
};

export default ErrorPage;
