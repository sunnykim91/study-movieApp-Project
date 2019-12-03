import React, { useState, useEffect } from "react";
import "./reset.css";
import "./Movie_List.css";
import axios from "axios";
import Media from "./Card";
import FilterBar from "./FilterBar";

const Movie_List = () => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  // const [likeCount, setLikeCount] = useState([]);

  const getMovieList = async () => {
    const {
      data: {
        data: { movies }
      }
    } = await axios.get("https://yts.lt/api/v2/list_movies.json?limit=12");
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
  }, []);

  return (
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
  );
};

export default Movie_List;
