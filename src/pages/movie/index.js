import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieInfo, getUrlMovie } from "../../store/moviesReducer";
import ErrorPage from "../error";
import { Button, CardMedia, Grid, Typography } from "@mui/material";
import { channelsService } from "../../services/api/channels";
import styled from "styled-components";
import VideoPlayer from "../../components/VideoPlayer";
import MovieInfo from "./components/MovieInfo";


const CardMediaMoviePoster = styled(CardMedia)`
  max-height: 600px;
`;

const CardMediaMovieImage = styled(CardMedia)`
  max-height: 150px;
`;

const ScrollView = styled.div`
  display: flex;
  overflow: auto;
`;

const ScrollViewVideos = styled(ScrollView)`
  max-width: 935px;

  @media (max-width: 950px) {
    max-width: 750px;
  }

  @media (max-width: 770px) {
    max-width: 555px;
  }

  @media (max-width: 570px) {
    max-width: 275px;
  }
`;

const MoviePage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [movieInfo, setMovieInfo] = useState(null);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);

  useEffect(() => {
    dispatch(getMovieInfo(params.id)).then(result => {
      if (!result.payload) {
        setError(result.error);
      } else {
        setMovieInfo(result.payload.film);
        if (result.payload.film.videos.length > 0) {
          setSelectedVideo(result.payload.film.videos[0]);
        }
      }

      return result;
    }).catch((e) => {
      console.log(e);
      setError("Internal error");
    });
  }, []);

  useEffect(() => {
    if (selectedVideo) {
      dispatch(getUrlMovie(selectedVideo.id)).then(result => {
        if (!result.payload) {
          setError(result.error);
        } else {
          setSelectedVideoUrl(result.payload.url);
        }
        return result;
      }).catch(e => {
        console.log(e);
        setError("Internal error");
      });
    }
  }, [selectedVideo]);

  const onClickVideo = (e) => {
    if (movieInfo) {
      const result = movieInfo.videos.filter(
        (v) => v.id === e.target.attributes["data-video-id"].value
      );
      if (result.length > 0) {
        setSelectedVideo(result[0]);
      }
    }
  };

  return (
    <>
      {error ? (
        <ErrorPage>
          <h1>{error}</h1>
        </ErrorPage>
      ) : movieInfo ? (
        <Grid
          container
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            container
            justifyContent="flex-start"
            alignItems="flex-start"
            mt={3}
            pl={3}
            pr={3}
          >
            <Grid
              item
              container
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              md={6}
              xs={12}
            >
              <Grid item>
                <CardMediaMoviePoster
                  component="img"
                  alt={movieInfo.name}
                  src={channelsService.getImageUrl(movieInfo.poster)}
                />
              </Grid>
            </Grid>
            <Grid
              item
              container
              justifyContent="flex-start"
              alignItems="center"
              xs={6}
              pl={3}
              display={{ md: "block", xs: "none" }}
            >
              <Grid item>
                <MovieInfo film={movieInfo} />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent="center"
            alignItems="center"
            mt={3}
          >
            <Grid item pl={3} pr={3}>
              {movieInfo.images.length > 0 ? (
                <ScrollView>
                  {movieInfo.images.map((v) => (
                    <CardMediaMovieImage
                      key={v.id}
                      component="img"
                      alt={v.id}
                      src={channelsService.getImageUrl(v.url)}
                      sx={{ marginRight: 1 }}
                    />
                  ))}
                </ScrollView>
              ) : (
                <Typography variant="h5">Not screenshots</Typography>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent="flex-start"
            alignItems="center"
            xs={12}
            mt={3}
            pl={3}
            pr={3}
            display={{ xs: "block", md: "none" }}
          >
            <Grid item>
              <MovieInfo film={movieInfo} />
            </Grid>
          </Grid>
          <Grid
            item
            container
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mt={3}
          >
            {movieInfo.videos.length > 0 ? (
              <>
                <Grid item xs={12}>
                  <ScrollViewVideos>
                    {movieInfo.videos.map((v, i) => (
                      <Button
                        key={v.id}
                        data-video-id={v.id}
                        variant="contained"
                        onClick={(e) => onClickVideo(e)}
                        sx={{ minWidth: "fit-content", marginRight: 1 }}
                      >
                        Video {i}
                      </Button>
                    ))}
                  </ScrollViewVideos>
                </Grid>
                <Grid item mt={3}>
                  <VideoPlayer url={selectedVideoUrl} />
                </Grid>
              </>
            ) : (
              <Grid item>
                <Typography variant="h5">Not video</Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};

export default MoviePage;
