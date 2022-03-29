import React from "react";
import { Grid } from "@mui/material";

const InfoPage = ({ item=false, children, ...props }) => {
  return (
    <Grid item={item} container justifyContent="center" alignItems="center">
      <Grid item {...props}>{children}</Grid>
    </Grid>
  );
};

export default InfoPage;
