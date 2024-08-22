import axios from "../../api/axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchPage.css";
import { useDebounce } from "../../hooks/useDebounce";
const SearchPage = () => {
  const Navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let query = useQuery();
  const searchTerm = query.get("q"); //?q=spiderman
  const debouncedValue = useDebounce(searchTerm, 1000);
  useEffect(() => {
    if (debouncedValue) {
      fetchSearchMovie(debouncedValue);
    }
  }, [debouncedValue]);
  const fetchSearchMovie = async (searchTerm) => {
    try {
      const response = await axios.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      setSearchResults(response.data.results);
      // console.log("response", response);
    } catch (error) {
      // console.log("error", error);
    }
  };

  if (searchResults.length > 0) {
    return (
      <section className="search-container">
        {searchResults.map((movie) => {
          const movieImage =
            "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            return (
              <div key={movie.id} className="movie">
                <div
                  onClick={() => Navigate(`/${movie.id}`)}
                  className="movie__column-poster">
                  <img src={movieImage} alt="movie" className="movie__poster" />
                </div>
              </div>
            );
          }
        })}
      </section>
    );
  } else {
    return (
      <section className="no-results">
        <div className="no-results__text">
          <p>찾고자하는 검색어 "{searchTerm}" 에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    );
  }
};

export default SearchPage;
