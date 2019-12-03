import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Rating from "@material-ui/lab/Rating";
import "./Card.css";

const useStyles = makeStyles(theme => ({
  card: {
    width: 380
  },
  media: {
    height: 500
  }
}));

function Media({ title, poster, rating, runtime, genres }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        action={<IconButton aria-label="settings"></IconButton>}
        title={title}
        subheader={
          <div>
            <div>
              <Rating
                name="size-large"
                value={rating / 2}
                precision={0.5}
                size="large"
              />
            </div>
            <div>상영시간 : {runtime}분</div>
          </div>
        }
      />
      {<CardMedia className={classes.media} image={poster} title={title} />}

      <CardContent className="cardContent">
        장르 :
        {genres.map((genre, index) => (
          <ul key={index} className="content-Ul">
            <li>{genre}</li>
          </ul>
        ))}
      </CardContent>
    </Card>
  );
}

export default Media;
