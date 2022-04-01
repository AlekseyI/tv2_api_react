import React, { useEffect, useState } from "react";
import VideoPlayer from "../../components/VideoPlayer";
import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllChannels, getUrlChannel, resetStateChannels, selectChannels } from "../../store/channelsReducer";
import { ChannelsUtils } from "../../utils/channels";
import InfoPage from "../info";

const ChannelPage = () => {
  const channelsState = useSelector(selectChannels);
  const dispatch = useDispatch();
  const params = useParams();
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedChannelUrl, setselectedChannelUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getAllChannels());

    return () => {
      dispatch(resetStateChannels());
    }
  }, []);

  useEffect(() => {
    if (selectedChannel) {
      dispatch(getUrlChannel(params.id))
        .then((result) => {
          if (!result.payload) {
            setError(result.error);
          } else {
            setselectedChannelUrl(result.payload.url);
          }
          return result;
        })
        .catch((e) => {
          console.log(e);
          setError("Internal Error");
        });
    }
  }, [selectedChannel]);

  useEffect(() => {
    if (channelsState.channels) {
      const channelInfo = ChannelsUtils.getChannelById(
        channelsState.channels,
        params.id
      );
      if (channelInfo) {
        setSelectedChannel(channelInfo);
      } else {
        setError("Channel not found");
      }
    }
  }, [channelsState.channels]);

  return (
    <>
      {channelsState.loading ? (
        <InfoPage>
          <h1>Loading...</h1>
        </InfoPage>
      ) : error ? (
        <InfoPage>
          <h1>{error}</h1>
        </InfoPage>
      ) : selectedChannel ? (
        <Grid
          container
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item mt={3}>
            <Typography variant="h5">{selectedChannel.name}</Typography>
          </Grid>
          <Grid item mt={3}>
            <VideoPlayer url={selectedChannelUrl} isStream={true} autoPlay={true} />
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};

export default ChannelPage;
