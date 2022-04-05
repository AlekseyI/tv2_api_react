import React, { useEffect, useRef, useState } from "react";
import VideoPlayer from "../../components/VideoPlayer";
import { Grid, List, ListItem, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllChannels, getChannel, getProgrammes, getUrlChannel, selectChannels } from "../../store/channelsReducer";
import InfoPage from "../info";
import AdapterMoment from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import moment from "moment";
import styled, { css } from "styled-components";
import { ChannelsUtils } from "../../utils/channels";
import PropTypes from "prop-types";
import { Constants } from "../../constants";

const ListProgrammes = styled(List)`
  overflow: auto;
  height: 300px
`;

const ElementProgramme = styled.div`
  ${props => props.select && css`
    background-color: grey;
  `}
`;

ElementProgramme.propTypes = {
  select: PropTypes.bool
};

const ChannelPage = () => {

  const channelsState = useSelector(selectChannels);
  const dispatch = useDispatch();
  const params = useParams();
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [selectedChannelUrl, setSelectedChannelUrl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateArchive, setSelectedDateArchive] = useState(null);
  const selectedArchiveRef = useRef(null);

  useEffect(() => {
    if (!channelsState.channels) {
      dispatch(getAllChannels());
    }
    onChangeDate(moment(), true);

    // return () => {
    //   dispatch(resetStateChannels());
    // }
  }, []);

  useEffect(() => {
    if (channelsState.channels) {
      dispatch(getChannel({ channels: channelsState.channels, id: params.id })).then((result) => {
        if (result.payload) {
          setSelectedChannel(result.payload);
        }
        return result;
      });
    }
  }, [channelsState.channels]);

  useEffect(() => {
    if (selectedArchiveRef.current) {
      selectedArchiveRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [selectedArchiveRef.current]);

  useEffect(() => {
    if (selectedDate) {
      if (!channelsState.programmes
        || !channelsState.programmes[params.id]
        || !channelsState.programmes[params.id][selectedDate.unixDMY]) {
        dispatch(getProgrammes({ id: params.id, day: selectedDate.valueDMY, gmt: selectedDate.unixDMY }));
      }
      if (channelsState.programmes && channelsState.programmes[params.id] && channelsState.programmes[params.id][selectedDate.unixDMY]) {
        setSelectedDateArchive(ChannelsUtils.getNearestTimeArchive(channelsState.programmes[params.id][selectedDate.unixDMY], selectedDate.value.unix()));
      }
    }
  }, [channelsState.programmes, selectedDate]);


  useEffect(() => {
    if (selectedChannel && selectedDateArchive) {
      dispatch(getUrlChannel({ id: params.id, unix: selectedDateArchive - Constants.DELAY_URL_GET_CHANNEL_URL }))
        .then((result) => {
          if (result.payload) {
            setSelectedChannelUrl(result.payload.url);
          }
          return result;
        });
    }
  }, [selectedChannel, selectedDateArchive]);

  const onShowProgramme = (event, programme) => {
    if (programme && selectedDateArchive !== programme.ut_start) {
      setSelectedDateArchive(programme.ut_start);
      selectedArchiveRef.current = event.currentTarget.parentElement;
    }
  };

  const onChangeDate = (date, isInit = false) => {
    if (date) {
      setSelectedDate({
        value: isInit ? date : moment().set({ date: date.date(), month: date.month(), year: date.year() }),
        valueDMY: date.format(Constants.CHANNEL_PROGRAMMES_DATE_FORMAT),
        unixDMY: moment(date.format(Constants.CHANNEL_PROGRAMMES_DATE_FORMAT), Constants.CHANNEL_PROGRAMMES_DATE_FORMAT).unix()
      });
    }
  };

  return (
    <>
      {channelsState.loading ? (
        <InfoPage>
          <h1>Loading...</h1>
        </InfoPage>
      ) : channelsState.error ? (
        <InfoPage>
          <h1>{channelsState.error.message}</h1>
        </InfoPage>
      ) : selectedChannel ? (
        <Grid
          container
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            container
            justifyContent="center"
            alignItems="flex-start"
            mt={3}
          >
            <Grid item container justifyContent="center" alignItems="center" xs={4} pl={2}>
              {
                channelsState.programmes && channelsState.programmes[params.id] && channelsState.programmes[params.id][selectedDate.unixDMY] ?
                  (
                    <>
                      <Grid item maxHeight={300}>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            views={["day"]}
                            openTo="day"
                            minDate={moment().subtract(14, "days")}
                            disableFuture={true}
                            value={selectedDate.value}
                            onChange={(date) => onChangeDate(date)}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12}>
                        <ListProgrammes>
                          {
                            selectedDateArchive ?
                              channelsState.programmes[params.id][selectedDate.unixDMY].map((programme, index) => (
                                <ListItem key={index} component="div" disablePadding>
                                  <ElementProgramme
                                    ref={selectedDateArchive === programme.ut_start ? selectedArchiveRef : null}
                                    select={selectedDateArchive === programme.ut_start}>
                                    <ListItemButton
                                      data-programme-time={programme.ut_start}
                                      onClick={(e) => {
                                        onShowProgramme(e, programme);
                                      }}>
                                      <Grid container justifyContent="center" alignItems="center">
                                        <Grid item xs={10}>
                                          <ListItemText primary={programme.progname} />
                                        </Grid>
                                        <Grid item xs={2}>
                                          <ListItemText sx={{ textAlign: "center" }} secondary={programme.t_start} />
                                        </Grid>
                                      </Grid>
                                    </ListItemButton>
                                  </ElementProgramme>
                                </ListItem>
                              )) : (
                                <InfoPage item>
                                  <h1>Programmes not found</h1>
                                </InfoPage>
                              )
                          }
                        </ListProgrammes>
                      </Grid>
                    </>
                  ) : null
              }
            </Grid>
            <Grid
              item
              container
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              xs={8}
            >
              <Grid item>
                <Typography variant="h5">{selectedChannel.name}</Typography>
              </Grid>
              <Grid item mt={3}>
                <VideoPlayer url={selectedChannelUrl} isStream={true} autoPlay={true} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </>
  );
};

export default ChannelPage;
