import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChannels, resetStateChannels, selectChannels } from "../../store/channelsReducer";
import { Grid } from "@mui/material";
import GridItemsList from "../../components/GridItemsList";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ChannelsUtils } from "../../utils/channels";
import ChannelItem from "../../components/ChannelItem";
import InfoPage from "../info";

const ChannelsPage = () => {
  const channelsState = useSelector(selectChannels);
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
  const [optionsChannelsCategories, setOptionsChannelsCategories] =
    useState(null);
  const [selectedChannelsCategories, setSelectedChannelsCategories] = useState(null);

  useEffect(() => {
    if (!channelsState.channels)
    {
      dispatch(getAllChannels());
    }

    // return () => {
    //   dispatch(resetStateChannels());
    // }
  }, []);

  useEffect(() => {
    if (channelsState.channels) {
      setOptionsChannelsCategories((value) => {
          value = ChannelsUtils.getChannelsCategoriesNamesForSelect(channelsState.channels);
          if (value)
          {
            onChangeChannelsCategories(value[0]);
          }

          return value;
        }
      );
    }
  }, [channelsState.channels]);

  const onChangeChannelsCategories = (options) => {
    setSelectedChannelsCategories(ChannelsUtils.getChannelsByCategoriesSelect(channelsState.channels, options));
  };

  return (
    channelsState.loading ? (
      <InfoPage>
        <h1>Loading...</h1>
      </InfoPage>
    ) : channelsState.error ? (
      <InfoPage>
        <h1>{channelsState.error.message}</h1>
      </InfoPage>
    ) : (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt={3}
    >
      <Grid item container justifyContent="center" alignItems="center">
        <Grid item lg={6} sm={10} xs={12}>
          {optionsChannelsCategories ? (
            <Select
              defaultValue={optionsChannelsCategories[0]}
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={optionsChannelsCategories}
              onChange={onChangeChannelsCategories}
              placeholder={"Select channels categories..."}
            />
          ) : null}
        </Grid>
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        rowSpacing={3}
        mt={3}
        xl={10}
        lg={10}
        md={11}
      >
        <GridItemsList
          items={selectedChannelsCategories}
          isLoading={channelsState.loading}
          descriptionNotFound={"Channels not found"}
          Element={ChannelItem}
        />
      </Grid>
    </Grid>)
  );
};

export default ChannelsPage;
