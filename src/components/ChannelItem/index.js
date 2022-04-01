import React from "react";
import { CardMedia, Grid, Link, Typography } from "@mui/material";
import { channelsService } from "../../services/api/channels";
import { LinkCustom } from "../LinkCustom";

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
        <LinkCustom to={"/channels/" + data.id}>
          <Typography variant="h5">{data.name}</Typography>
        </LinkCustom>
      </Grid>
      <Grid item>
        <LinkCustom to={"/channels/" + data.id}>
          <CardMedia
            component="img"
            alt={data.name}
            src={channelsService.getChannelImageUrl(data.icon, true)}
          />
        </LinkCustom>
      </Grid>
    </Grid>
  );
};

export default ChannelItem;
