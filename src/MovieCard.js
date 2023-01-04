import React, { useEffect, useState } from "react";

// import SearchIcon from "./searchIcon.png";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=e5ad3bbb";
// http://www.omdbapi.com/apikey.aspx

const List = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Spiderman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data.Search);
    setMovies(data.Search);
  };

  const MovieCardList = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
    return (
      <div className="movie" key={imdbID}>
        <div>
          <p>{Year}</p>
        </div>

        <div>
          <img
            src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"}
            alt={Title}
          />
        </div>

        <div>
          <span>{Type}</span>
          <h3>{Title}</h3>
        </div>
      </div>
    );
  };
  return (
    <div className="app">
      <h1>MovieLand</h1>
      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          //   src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies && movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCardList movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default List;
