import React from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userReducer";
import InfoPage from "../info";

const AccountPage = () => {
  const userState = useSelector(selectUser);

  return (
    userState.loading ? (
      <InfoPage>
        <h1>Loading...</h1>
      </InfoPage>
    ) : userState.error ? (
      <InfoPage>
        <h1>{userState.error}</h1>
      </InfoPage>
    ) : (
      <Grid container justifyContent="center" alignItems="center">
        <Grid item>
          <Typography variant="h3">{userState.account?.packet_name}</Typography>
        </Grid>
      </Grid>)
  );
};

export default AccountPage;
