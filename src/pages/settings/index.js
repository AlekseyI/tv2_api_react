import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSetting, getAllSettings, resetStateSettings, selectSettigs } from "../../store/settingsReducer";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InfoPage from "../info";

const SettingsPage = () => {
  const settingsState = useSelector(selectSettigs);
  const dispatch = useDispatch();
  const [selectedBitrate, setSelectedBitrate] = useState("");
  const [selectedHttpCaching, setSelectedHttpCaching] = useState("");
  const [selectedTimeshift, setSelectedTimeshift] = useState("");

  const settingsSchema = yup.object().shape({
    bitrate: yup.string().required("Field is required"),
    http_caching: yup.string().required("Field is required"),
    timeshift: yup.string().required("Field is required")
  });

  const { register, control, handleSubmit } = useForm({
    resolver: yupResolver(settingsSchema)
  });

  useLayoutEffect(() => {
    dispatch(getAllSettings());

    return () => {
      dispatch(resetStateSettings());
    }
  }, []);

  useEffect(() => {
    if (settingsState.settings) {
      setSelectedBitrate(settingsState.settings.bitrate.value);
      setSelectedHttpCaching(settingsState.settings.http_caching.value);
      setSelectedTimeshift(settingsState.settings.timeshift.value);
    }
  }, [settingsState.settings]);

  const onChangeBitrate = (e) => {
    setSelectedBitrate(e.target.value);
  };

  const onChangeHttpCaching = (e) => {
    setSelectedHttpCaching(e.target.value);
  };

  const onChangeTimeshift = (e) => {
    setSelectedTimeshift(e.target.value);
  };

  const onApplySettings = (data) => {
    if (data && settingsState.settings) {
      for (const item in data) {
        if (data[item] !== settingsState.settings[item].value) {
          dispatch(changeSetting({ name: item, value: data[item] }));
        }
      }
    }
  };

  return (
    <>
      {
        settingsState.loading ? (
          <InfoPage>
            <h1>Loading...</h1>
          </InfoPage>
        ) : settingsState.error ? (
          <InfoPage>
            <h1>{settingsState.error}</h1>
          </InfoPage>
        ) : settingsState.settings ?
          (
            <Grid container flexDirection="column" justifyContent="center" alignItems="center" mt={3}>
              <Grid item container justifyContent="center" rowSpacing={2} lg={3} md={4} sm={6} xs={12}>
                <Grid item xs={12}>
                  <Controller
                    render={({ field, formState }) => (
                      <FormControl fullWidth>
                        <InputLabel id="bitrate-label">Bitrate</InputLabel>
                        <Select
                          {...field}
                          {...register("bitrate")}
                          labelId="bitrate-label"
                          value={selectedBitrate}
                          label="Bitrate"
                          onChange={onChangeBitrate}
                          error={!!formState.errors?.bitrate}
                        >
                          {
                            settingsState.settings.bitrate.names.map((value, index) => (
                              <MenuItem key={index} value={value.val}>{value.title}</MenuItem>
                            ))
                          }
                        </Select>
                        <Box color="red">
                          {!!formState.errors?.bitrate?.message
                            ? formState.errors.bitrate.message
                            : null}
                        </Box>
                      </FormControl>)}
                    name="bitrate"
                    control={control}
                    defaultValue={settingsState.settings.bitrate.value} />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    render={({ field, formState }) => (
                      <FormControl fullWidth>
                        <InputLabel id="http_caching-label">Http Caching</InputLabel>
                        <Select
                          {...field}
                          {...register("http_caching")}
                          labelId="http_caching-label"
                          value={selectedHttpCaching}
                          label="Http Caching"
                          onChange={onChangeHttpCaching}
                          error={!!formState.errors?.http_caching}
                        >
                          {
                            settingsState.settings.http_caching.list.map((value, index) => (
                              <MenuItem key={index} value={value}>{value}</MenuItem>
                            ))
                          }
                        </Select>
                        <Box color="red">
                          {!!formState.errors?.http_caching?.message
                            ? formState.errors.http_caching.message
                            : null}
                        </Box>
                      </FormControl>)}
                    name="http_caching"
                    control={control}
                    defaultValue={settingsState.settings.http_caching.value} />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    render={({ field, formState }) => (
                      <FormControl fullWidth>
                        <InputLabel id="timeshift-label">Timeshift</InputLabel>
                        <Select
                          {...field}
                          {...register("timeshift")}
                          labelId="timeshift-label"
                          value={selectedTimeshift}
                          label="Timeshift"
                          onChange={onChangeTimeshift}
                          error={!!formState.errors?.timeshift}
                        >
                          {
                            settingsState.settings.timeshift.list.map((value, index) => (
                              <MenuItem key={index} value={value}>{value}</MenuItem>
                            ))
                          }
                        </Select>
                        <Box color="red">
                          {!!formState.errors?.timeshift?.message
                            ? formState.errors.timeshift.message
                            : null}
                        </Box>
                      </FormControl>)}
                    name="timeshift"
                    control={control}
                    defaultValue={settingsState.settings.timeshift.value} />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="flex-end">
                  <Button type="button" variant="contained" onClick={handleSubmit(onApplySettings)}>
                    Apply Settings
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : null
      }
    </>
  );
};


export default SettingsPage;