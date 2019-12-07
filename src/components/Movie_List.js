import React, { useState, useEffect, createContext } from "react";
import "./reset.css";
import "./Movie_List.css";
import axios from "axios";
import Media from "./Card";
import FilterBar from "./FilterBar";

export const MovieListContext = createContext();

const Movie_List = () => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(5);
  const [someAlign, setSomeAlign] = useState("");
  const [align, setAlign] = useState("desc");

  const handleChange = e => {
    e.preventDefault();
    console.log(e.target.value);
    setGenre(e.target.value);
  };
  const setRatingFilter = (e, value) => {
    setRating(value);
  };

  const setSomeAlignFilter = e => {
    setSomeAlign(e.target.value);
  };

  const setAlignFilter = e => {
    setAlign(e.target.value);
  };

  // const changeMovieListGenreFilter = async () => {
  //   const {
  //     data: {
  //       data: { movies }
  //     }
  //   } = await axios.get(
  //     `https://yts.lt/api/v2/list_movies.json?limit=12&genre=${genre}`
  //   );
  //   console.log(movies);
  //   setMovieList(movies);
  // };
  // const [likeCount, setLikeCount] = useState([]);

  const getMovieList = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get(
      `https://yts.lt/api/v2/list_movies.json?limit=12&genre=${genre}&minimum_rating=${rating}&sort_by=${someAlign}&order_by=${align}`
    );
    console.log(movies);
    setMovieList(movies);
    setIsloading(false);
  };

  // const getLikeCount = id => {
  //   console.log(id);
  //   const {
  //     data: {
  //       data: { like_count }
  //     }
  //   } = axios.get(`https://yts.lt/api/v2/movie_details.json?movie_id=${id}`);
  //   console.log(like_count);
  // };

  useEffect(() => {
    getMovieList();
  }, [genre, rating, someAlign, align]);

  const value = {
    state: { genre, rating, someAlign, align },
    actions: {
      handleChange,
      setRatingFilter,
      setSomeAlignFilter,
      setAlignFilter
    }
  };

  return (
    <MovieListContext.Provider value={value}>
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            <FilterBar />
            {movieList.map(movie => (
              <div className="movie_list_item" key={movie.id}>
                <Media
                  title={movie.title}
                  poster={movie.medium_cover_image}
                  rating={movie.rating}
                  runtime={movie.runtime}
                  genres={movie.genres}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </MovieListContext.Provider>
  );
};

export default Movie_List;
