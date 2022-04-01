import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieInfo, getUrlMovie, selectMovies } from "../../store/moviesReducer";
import InfoPage from "../info";
import { Button, CardMedia, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import VideoPlayer from "../../components/VideoPlayer";
import MovieInfo from "./components/MovieInfo";
import { GlobalUtils } from "../../utils/global";
import { baseService } from "../../services/api/base";


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
  const moviesState = useSelector(selectMovies);
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
      setError("Internal Error");
    });
  }, []);

  useEffect(() => {
    if (selectedVideo) {
      dispatch(getUrlMovie(selectedVideo.id)).then(result => {
        if (!result.payload) {
          setError(result.error);
        } else {
          setSelectedVideoUrl(GlobalUtils.removeParamsFromStreamingUrl(result.payload.url));
        }
        return result;
      }).catch(e => {
        console.log(e);
        setError("Internal Error");
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
      {
        moviesState.loading ? (
          <InfoPage>
            <h1>Loading...</h1>
          </InfoPage>
        ) : error ? (
          <InfoPage>
            <h1>{error}</h1>
          </InfoPage>
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
                    src={baseService.getImageUrl(movieInfo.poster)}
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
                        src={baseService.getImageUrl(v.url)}
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
                  {
                    selectedVideo ? (
                      <Grid item mt={3} xs={12}>
                        <VideoPlayer url={selectedVideoUrl} />
                      </Grid>) : (
                      <InfoPage item>
                        <h1>Not video</h1>
                      </InfoPage>
                    )
                  }
                </>
              ) : (
                <InfoPage item>
                  <h1>Not video</h1>
                </InfoPage>
              )}
            </Grid>
          </Grid>
        ) : null}
    </>
  );
};

export default MoviePage;
