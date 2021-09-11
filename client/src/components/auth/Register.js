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
import { styles } from "./styles";
import Copyright from "../Copyright";

import { useForm } from "react-hook-form";
import { registerValidation } from "./validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

const Register = ({ classes, history }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/listing");
    }
  }, [isAuthenticated, history]);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(registerValidation),
  });

  const onSubmit = (data) => {
    dispatch(registerUser(data, history, setError));
  };

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
                error={errors.name ? true : false}
                helperText={errors.name ? errors.name.message : null}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                {...register("email")}
                error={errors.email ? true : false}
                helperText={errors.email ? errors.email.message : null}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                {...register("password")}
                error={errors.password ? true : false}
                helperText={errors.password ? errors.password.message : null}
                variant="outlined"
                type="password"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password2"
                name="password2"
                label="Re-enter password"
                {...register("password2")}
                error={errors.password2 ? true : false}
                helperText={errors.password2 ? errors.password2.message : null}
                variant="outlined"
                type="password"
                required
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
        </form>
      </div>
      <Grid container justifycontent="flex-end">
        <Grid item>
          <Link to="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </Grid>
      </Grid>
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
