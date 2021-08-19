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

import { loginUser } from "../../actions/authActions";
import { styles } from "./formStyles";
import Copyright from "../Copyright";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

const LogIn = ({ classes, history }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { errors } = useSelector((state) => state);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/listing");
    }
  }, [isAuthenticated, history]);

  const onSubmit = (userData) => {
    dispatch(loginUser(userData));
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email("Not a valid email").required("Required"),
    password: yup.string().required("Required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors: fieldError },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(validationSchema),
  });

  const showServerError = Boolean(
    errors.emailnotfound || errors.passwordincorrect
  );
  const serverErrorMsg = showServerError ? "Wrong email or password" : "";

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            {...register("email")}
            error={fieldError.email || showServerError ? true : false}
            helperText={fieldError.email ? fieldError.email.message : null}
            variant="outlined"
            required
            autoComplete="email"
            margin="normal"
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            {...register("password")}
            error={fieldError.password || showServerError ? true : false}
            helperText={
              fieldError.password ? fieldError.password.message : serverErrorMsg
            }
            variant="outlined"
            type="password"
            required
            autoComplete="current-password"
            margin="normal"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log in
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/" variant="body2">
                {"Forgot password?"}
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
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

LogIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LogIn);
