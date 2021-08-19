import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { registerUser } from "../../actions/authActions";
import { styles } from "./formStyles";
import Copyright from "../Copyright";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

const Register = ({ classes, history }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { errors } = useSelector((state) => state);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/listing");
    }
  }, [isAuthenticated, history]);

  const onSubmit = (data) => {
    dispatch(registerUser(data, history));
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    password2: yup
      .string()
      .required("Field required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors: fieldError },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                {...register("name")}
                error={fieldError.name || errors.name ? true : false}
                helperText={fieldError.name ? fieldError.name.message : null}
                variant="outlined"
                required
                autoComplete="new-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                {...register("email")}
                error={fieldError.email || errors.email ? true : false}
                helperText={
                  fieldError.email ? fieldError.email.message : errors.email
                }
                variant="outlined"
                required
                autoComplete="new-email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                {...register("password")}
                error={fieldError.password || errors.password ? true : false}
                helperText={
                  fieldError.password ? fieldError.password.message : null
                }
                variant="outlined"
                type="password"
                required
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password2"
                name="password2"
                label="Re-enter password"
                {...register("password2")}
                error={fieldError.password2 || errors.password2 ? true : false}
                helperText={
                  fieldError.password2 ? fieldError.password2.message : null
                }
                variant="outlined"
                type="password"
                required
                autoComplete="new-password2"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive spam email"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container justifycontent="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
