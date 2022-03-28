import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { CardMedia } from "@mui/material";
import styled from "styled-components";
import ErrorPage from "../../pages/error";

const CardMediaVideo = styled(CardMedia)`
  height: 500px;

  @media (max-width: 1015px) {
    height: 400px;
  }

  @media (max-width: 815px) {
    height: 300px;
  }
`;

const VideoPlayer = ({ url, children, ...props }) => {
  const videoRef = useRef();
  const [error, setError] = useState(null);
  useEffect(() => {
    console.log(url);
    if (url)
    {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(videoRef.current);
      } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
        videoRef.current.src = url;
      } else {
        setError("Not supported");
      }
    }
  }, [url]);

  return (
    <>
      {error ? (
        <ErrorPage>
          <h1>{error}</h1>
        </ErrorPage>
      ) : null}
      <CardMediaVideo
        {...props}
        component="video"
        autoPlay
        controls
        ref={videoRef}
      >
        {children}
      </CardMediaVideo>
    </>
  );
};

export default VideoPlayer;