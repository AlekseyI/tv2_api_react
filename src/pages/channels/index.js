import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllChannels } from "../../store/channelsReducer";
import { Grid } from "@mui/material";
import GridItemsList from "../../components/GridItemsList";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ChannelsUtils } from "../../utils/channels";
import ChannelItem from "../../components/ChannelItem";

const ChannelsPage = () => {
  const dispatch = useDispatch();
  const animatedComponents = makeAnimated();
  const [optionsChannelsCategories, setOptionsChannelsCategories] =
    useState(null);
  const [selectedChannels, setSelectedChannels] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllChannels(true)).then((v) => {
      setOptionsChannelsCategories(
        ChannelsUtils.getChannelsCategoriesNamesForSelect()
      );
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (optionsChannelsCategories) {
      onChangeChannelsCategories(optionsChannelsCategories[0]);
    }
  }, [optionsChannelsCategories]);

  const onChangeChannelsCategories = (options) => {
    setSelectedChannels(ChannelsUtils.getChannelsByCategoriesSelect(options));
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
          items={selectedChannels ? selectedChannels : []}
          isLoading={isLoading}
          descriptionNotFound="Channels not found"
          Element={ChannelItem}
        />
      </Grid>
    </Grid>
  );
};

export default ChannelsPage;
