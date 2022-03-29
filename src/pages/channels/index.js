import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChannels, selectChannels } from "../../store/channelsReducer";
import { Grid } from "@mui/material";
import GridItemsList from "../../components/GridItemsList";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ChannelsUtils } from "../../utils/channels";
import ChannelItem from "../../components/ChannelItem";

const ChannelsPage = () => {
  const channelsState = useSelector(selectChannels);
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
  const [optionsChannelsCategories, setOptionsChannelsCategories] =
    useState(null);
  const [selectedChannelsCategories, setSelectedChannelsCategories] = useState(null);

  useEffect(() => {
    dispatch(getAllChannels(false));
  }, []);

  useEffect(() => {
    if (channelsState.channels) {
      setOptionsChannelsCategories((value) => {
          value = ChannelsUtils.getChannelsCategoriesNamesForSelect(channelsState.channels);
          onChangeChannelsCategories(value[0]);
          return value;
        }
      );
    }
  }, [channelsState.channels]);

  const onChangeChannelsCategories = (options) => {
    setSelectedChannelsCategories(ChannelsUtils.getChannelsByCategoriesSelect(channelsState.channels, options));
  };

  return (
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
          items={selectedChannelsCategories ? selectedChannelsCategories : []}
          isLoading={channelsState.loading}
          descriptionNotFound="Channels not found"
          Element={ChannelItem}
        />
      </Grid>
    </Grid>
  );
};

export default ChannelsPage;
