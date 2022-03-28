import React from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userReducer";

const AccountPage = () => {
  const userState = useSelector(selectUser);

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item>
        <Typography variant="h3">{userState.account?.packet_name}</Typography>
      </Grid>
    </Grid>
  );
};

export default AccountPage;
