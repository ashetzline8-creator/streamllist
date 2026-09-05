import { useState } from "react";

function MovieSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");

  const searchMovies = async () => {
    if (searchTerm.trim() === "") {
      setMessage("Please enter a movie title.");
      setMovies([]);
      return;
    }

    try {
      setMessage("Searching...");

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
          searchTerm
        )}&include_adult=false&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to retrieve movies.");
      }

      const data = await response.json();

      setMovies(data.results);

      if (data.results.length === 0) {
        setMessage("No movies were found.");
      } else {
        setMessage("");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong while searching TMDB.");
      setMovies([]);
    }
  };

  return (
    <section className="movie-search-page">
      <p className="eyebrow">TMDB MOVIE SEARCH</p>

      <h2>Search for a movie</h2>

      <p className="movie-search-description">
        Search the TMDB database to review movie information.
      </p>

      <div className="movie-search-form">
        <input
          type="text"
          placeholder="Enter a movie title..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              searchMovies();
            }
          }}
        />

        <button onClick={searchMovies}>
          <span className="material-icons">search</span>
          Search
        </button>
      </div>

      {message && <p className="search-message">{message}</p>}

      <div className="movie-results">
        {movies.map((movie) => (
          <article className="movie-result-card" key={movie.id}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
              />
            ) : (
              <div className="no-poster">
                <span className="material-icons">movie</span>
                <p>No poster available</p>
              </div>
            )}

            <div className="movie-result-info">
              <h3>{movie.title}</h3>

              <p>
                <strong>Release Date:</strong>{" "}
                {movie.release_date || "Not available"}
              </p>

              <p>
                <strong>Rating:</strong>{" "}
                {movie.vote_average
                  ? `${movie.vote_average.toFixed(1)} / 10`
                  : "Not rated"}
              </p>

              <p className="movie-overview">
                {movie.overview || "No overview is available for this movie."}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default MovieSearch;