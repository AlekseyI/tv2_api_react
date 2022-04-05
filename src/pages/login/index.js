import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../store/userReducer";
import { Box, Button, FormControl, Grid, TextField, Typography } from "@mui/material";
import InfoPage from "../info";

const LoginPage = () => {
  let loginSchema = yup.object().shape({
    login: yup.string().required("Field is required"),
    pass: yup.string().required("Field is required")
  });
  const { register, handleSubmit, reset, control } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
    shouldFocusError: true,
    criteriaMode: "all",
    reValidateMode: "onChange"
  });
  const dispatch = useDispatch();
  const userState = useSelector(selectUser);
  const [loginData, setLoginData] = useState(null);

  const onLogin = (data) => {
    setLoginData(data);
    dispatch(login(data));
  };

  useEffect(() => {
    if (userState.error) {
      if (loginData && loginData.login)
        reset({ login: loginData.login });
    }
  }, [userState.error]);

  return (
    userState.loading ? (
      <InfoPage>
        <h1>Loading...</h1>
      </InfoPage>
    ) : (
      <Grid
        container
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={1}
      >
        <Grid item container justifyContent="center" rowSpacing={2} xl={3} lg={4} md={6} sm={8} xs={12}>
          <Grid item xs={12}>
            <Typography variant="h3" component="h3" textAlign="center">
              Login
            </Typography>
          </Grid>
          {userState.error ? (
            <Grid item xs={12}>
              <Box color="red">{userState.error.message}</Box>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <Controller
              render={({ field, formState }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    {...register("login")}
                    label="Login"
                    error={!!formState.errors?.login}
                  />
                  <Box color="red">
                    {!!formState.errors?.login?.message
                      ? formState.errors.login.message
                      : null}
                  </Box>
                </FormControl>
              )}
              name="login"
              control={control}
              defaultValue=""
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              render={({ field, formState }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    {...register("pass")}
                    label="Password"
                    type="password"
                    error={!!formState.errors?.pass}
                  />
                  <Box color="red">
                    {!!formState.errors?.pass?.message
                      ? formState.errors.pass.message
                      : null}
                  </Box>
                </FormControl>
              )}
              name="pass"
              control={control}
              defaultValue=""
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="flex-end">
            <Button type="button" variant="contained" onClick={handleSubmit(onLogin)}>
              Login
            </Button>
          </Grid>
        </Grid>
      </Grid>)
  );
};

export default LoginPage;
