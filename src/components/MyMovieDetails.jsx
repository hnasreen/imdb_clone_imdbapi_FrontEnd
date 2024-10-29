import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";

const MyMovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null); // For handling errors

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Could not fetch movie details. Please try again later.");
      }
    };
    fetchMovie();
    window.scrollTo(0, 0); // Scroll to top on page load
  }, [id]);

  if (error) return <p>{error}</p>; // Show error if any
  if (!movie) return <p>Loading...</p>; // Show loading state

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-4">
          <img
            className="img-fluid rounded"
            src={movie.poster}
            alt={movie.name}
            style={{height:'400px'}}
          />
        </div>
        <div className="col-md-8">
          <h2 className="movie__name">{movie.name}</h2>
          <div className="text-muted">
            {movie.yearOfRelease
              ? `Release date: ${movie.yearOfRelease}`
              : "Release date not available"}
          </div>
          <h4 className="mt-3">Synopsis</h4>
          <p style={{ fontStyle: "italic" }}>
            {movie.plot || "Synopsis not available"}
          </p>
          <h4>Production Team</h4>
          <div className="d-flex flex-wrap">
            {movie.producers && movie.producers.length > 0 ? (
              movie.producers.map((company) => (
                <span
                  className="badge bg-secondary me-2 mb-2"
                  key={company.id || company.name}
                >
                  {company.name}
                </span>
              ))
            ) : (
              <p>No production companies available.</p>
            )}
          </div>

          <h4 className="mt-4">Cast</h4>
          <div className="d-flex flex-wrap">
            {movie.actors && movie.actors.length > 0 ? (
              movie.actors.map((actor) => (
                <div
                  className="text-center me-3 mb-4"
                  style={{ marginRight: "10px" }}
                  key={actor.id || actor.name}
                >
                  <IoPersonCircleOutline />
                  <div>{actor.name}</div>
                </div>
              ))
            ) : (
              <p>No actor details available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMovieDetails;
