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
    height: 300px;
  }
`;

const VideoPlayer = ({ url, controls=true, autoPlay=false, isStream=false, children, ...props }) => {
  const videoRef = useRef();
  useEffect(() => {
    if (url)
    {
      if (Hls.isSupported() && isStream) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(videoRef.current);
      } else
      {
        videoRef.current.src = url;
      }
    }
  }, [url, isStream]);

  return (
      <CardMediaVideo
        {...props}
        component="video"
        autoPlay={autoPlay}
        controls={controls}
        ref={videoRef}
      >
        {children}
      </CardMediaVideo>
  );
};

export default VideoPlayer;