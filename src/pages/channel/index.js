import React, { useEffect, useState } from "react";
import VideoPlayer from "../../components/VideoPlayer";
import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllChannels,
  getUrlChannel,
  selectChannels,
} from "../../store/channelsReducer";
import { ChannelsUtils } from "../../utils/channels";
import ErrorPage from "../error";

const ChannelPage = () => {
  const channelsState = useSelector(selectChannels);
  const dispatch = useDispatch();
  const params = useParams();
  const [channelInfo, setChannelInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getAllChannels(false));
  }, []);

  useEffect(() => {
    if (!channelsState.channels) {
      return;
    }

    const localChannelInfo = ChannelsUtils.getChannelWithCategoryByIdChannel(
      params.id
    );
    if (!localChannelInfo) {
      setError("Channel not found");
      return;
    }
    dispatch(getUrlChannel(params.id))
      .then((result) => {
        if (!result.payload) {
          setError(result.error);
          return;
        }
        localChannelInfo.channels[0] = {
          ...localChannelInfo.channels[0],
          ...result.payload,
        };
        setChannelInfo(localChannelInfo);
      })
      .catch((e) => setError(e.response.data.error));
  }, [channelsState.channels]);

  return (
    <>
      {error ? (
        <ErrorPage>
          <h1>{error}</h1>
        </ErrorPage>
      ) : channelInfo ? (
        <Grid
          container
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item mt={3}>
            <Typography variant="h5">{channelInfo.channels[0].name}</Typography>
          </Grid>
          <Grid item mt={3}>
            {channelInfo.channels ? (
              <VideoPlayer url={channelInfo.channels[0].url} height={500} />
            ) : null}
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};

export default ChannelPage;
