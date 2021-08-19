import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        to={{ pathname: "https://github.com/malmgrek" }}
        target="_blank"
      >
        Malmgrek
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
