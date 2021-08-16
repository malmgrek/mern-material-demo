import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Container,
  Grid,
  Typography,
  withStyles,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

import api from "../api";

// TODO: To functional form
// TODO: Refactor query result as props
// TODO: Search field
// TODO: Display image

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
});

const Listing = (props) => {
  const [items, setItems] = useState(null);

  useEffect(() => {
    const getFreeItems = async () => {
      const {
        data: { data },
      } = await api.readFreeItems();
      setItems(data);
    };
    getFreeItems();
  }, []);

  async function handleTakeClick(id) {
    const { data } = await api.takeItem(id);
    setItems(items.filter((item) => item._id !== data.id));
  }

  const { classes } = props;
  return (
    <>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Listing
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Mangle, tweak, and take items
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justifycontent="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        {!items ? null : (
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {items.map((item) => (
                <Grid item key={item._id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={item.imgUrl}
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.name}
                      </Typography>
                      <Typography>{item.description}</Typography>
                      <Rating
                        name="half-rating"
                        value={item.rating}
                        defaultValue={0.0}
                        precision={0.5}
                      />
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Info
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleTakeClick(item._id)}
                      >
                        Take
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
      </main>
    </>
  );
};

Listing.propTypes = { classes: PropTypes.object.isRequired };

export default withStyles(styles)(Listing);
