import React, { useEffect, useRef } from "react";
import Hls from "hls.js";
import { CardMedia } from "@mui/material";
import styled from "styled-components";

const CardMediaVideo = styled(CardMedia)`
  height: 500px;

  @media (max-width: 1015px) {
    height: 400px;
  }

  @media (max-width: 815px) {
    height: auto;
  }
`;

const VideoPlayer = ({
                       url,
                       controls = true,
                       autoPlay = false,
                       isStream = false,
                       isLive = false,
                       children,
                       ...props
                     }) => {
  const videoRef = useRef();

  useEffect(() => {
    try {
      if (url) {
        if (Hls.isSupported() && isStream) {
          const config = {
            liveDurationInfinity: isLive
          };
          const hls = new Hls(config);
          hls.loadSource(url);
          hls.attachMedia(videoRef.current);

          return () => {
            hls.destroy();
          };
        } else {
          videoRef.current.src = url;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [url, isStream]);

  return (
    <>
      <CardMediaVideo
        {...props}
        component="video"
        autoPlay={autoPlay}
        controls={controls}
        ref={videoRef}
      >
        {children}
      </CardMediaVideo>
    </>
  );
};

export default VideoPlayer;