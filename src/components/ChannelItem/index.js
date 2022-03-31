import React from "react";
import { CardMedia, Grid, Link, Typography } from "@mui/material";
import { channelsService } from "../../services/api/channels";

const ChannelItem = ({ data }) => {
  return (
    <Grid
      item
      container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      xl={3}
      lg={4}
      md={5}
      xs={12}
    >
      <Grid item>
        <Link href={"/channels/" + data.id} underline="none" color="black">
          <Typography variant="h5">{data.name}</Typography>
        </Link>
      </Grid>
      <Grid item>
        <Link href={"/channels/" + data.id} underline="none" color="black">
          <CardMedia
            component="img"
            alt={data.name}
            src={channelsService.getChannelImageUrl(data.icon, true)}
          />
        </Link>
      </Grid>
    </Grid>
  );
};

export default ChannelItem;
