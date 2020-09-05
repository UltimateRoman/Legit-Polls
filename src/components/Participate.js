import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 100,
  },
});
const Link = require("react-router-dom").Link;
export default function FeaturedPost(props) {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
              <ul>
                    <li><Link to="/poll" style={{ color: 'black' }}>Available Poll</Link></li>
                </ul>
              </Typography>
              
              <Typography variant="subtitle1" paragraph>
                Click to view the available Polls right now
              </Typography>
              
            </CardContent>
          </div>
          
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.object,
};