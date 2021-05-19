import PropTypes from "prop-types";
import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import api from "../api";

// TODO: To functional form
// TODO: Refactor query result as props
// TODO: Search field
// TODO: Display image

const styles = theme => ({
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


class Listing extends Component {

  constructor() {
    super();
    this.state = {
      items: [],
      lastTakenItem: null,
    }
  }

  componentDidMount = async () => {
    await api.readFreeItems().then(res => {
      this.setState({
        items: res.data.data,
      });
    })
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if (this.state.lastTakenItem !== prevState.lastTakenItem) {
      await api.readFreeItems().then(res => {
        this.setState({
          items: res.data.data,
        });
      })
    }
  }

  handleTakeClick = async id => {
    await api.takeItem(id).then(res => {
      this.setState({ lastTakenItem: id });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                Listing
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Mangle, tweak, and take items
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
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
          <Container className={classes.cardGrid} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {this.state.items.map((item) => (
                <Grid item key={item._id} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    {/* <CardMedia */}
                    {/*   className={classes.cardMedia} */}
                    {/*   image="https:source.unsplash.com/random" */}
                    {/*   title="Image title" */}
                    {/* /> */}
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">{item.name}</Typography>
                      <Typography>{item.description}</Typography>
                      <Rating name="half-rating" value={item.rating} defaultValue={0.0} precision={0.5}/>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Info
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => this.handleTakeClick(item._id)}
                      >
                        Take
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </React.Fragment>
    );
  }

}


Listing.propTypes = {classes: PropTypes.object.isRequired};


export default withStyles(styles)(Listing);
