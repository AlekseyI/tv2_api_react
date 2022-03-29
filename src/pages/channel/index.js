import React, { useEffect, useState } from "react";
import VideoPlayer from "../../components/VideoPlayer";
import { Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllChannels, getUrlChannel, selectChannels } from "../../store/channelsReducer";
import { ChannelsUtils } from "../../utils/channels";
import InfoPage from "../info";

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
    if (channelsState.channels) {
      const localChannelInfo = ChannelsUtils.getChannelWithCategoryByIdChannel(
        channelsState.channels,
        params.id
      );
      if (localChannelInfo) {
        dispatch(getUrlChannel(params.id))
          .then((result) => {
            if (!result.payload) {
              setError(result.error);
            } else {
              localChannelInfo.channels[0] = {
                ...localChannelInfo.channels[0],
                url: result.payload.url
              };
              setChannelInfo(localChannelInfo);
            }
            return result;
          })
          .catch((e) => {
            console.log(e);
            setError("Internal Error");
          });
      } else {
        setError("Channel not found");
      }
    }
  }, [channelsState.channels]);

  return (
    <>
      {error ? (
        <InfoPage>
          <h1>{error}</h1>
        </InfoPage>
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
              <VideoPlayer url={channelInfo.channels[0].url} isStream={true} autoPlay={true} height={500} />
            ) : null}
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};

export default ChannelPage;
