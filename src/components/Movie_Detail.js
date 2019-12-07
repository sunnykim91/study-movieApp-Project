import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./Movie_Detail.css";

const useStyles = makeStyles({
  card: {
    width: 400
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const MovieDetail = ({ match }) => {
  const classes = useStyles();

  const [movieTitle, setMovieTitle] = useState("");
  const [movieYear, setMovieYear] = useState();
  const [movieDescription_full, setMovieDescription_full] = useState("");
  const [suggestionMovies, setSuggestionMovies] = useState([]);

  const getMovieInfo = async () => {
    const {
      data: {
        data: { movie }
      }
    } = await axios.get(
      `https://yts.lt/api/v2/movie_details.json?movie_id=${match.params.id}`
    );
    getSuggestionMovie();
    setMovieTitle(movie.title);
    setMovieYear(movie.year);
    setMovieDescription_full(movie.description_full);
  };

  const getSuggestionMovie = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get(
      `https://yts.lt/api/v2/movie_suggestions.json?movie_id=${match.params.id}`
    );
    setSuggestionMovies(movies);
  };

  useEffect(() => {
    getMovieInfo();
  }, []);

  return (
    <div className="MovieInfo">
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {movieTitle}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {movieYear}
          </Typography>
          <Typography variant="body2" component="p">
            {movieDescription_full}
          </Typography>
          <div className="sugMovieTitle">
            <div className="sugMovieTop">관련 영화</div>
            {suggestionMovies.map(sugMovie => (
              <div key={sugMovie.id} className="sugMovieItem">
                {sugMovie.title}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovieDetail;
