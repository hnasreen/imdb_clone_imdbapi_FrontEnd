import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoPersonCircleOutline } from "react-icons/io5";
import MovieContext from "../../context/MovieContext.jsx";
import '../MyMovieDetails/MyMovieDetails.css'

const MyMovieDetails = () => {
  const { id } = useParams();
  const { actors, producers } = useContext(MovieContext);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`${process.env.API_BASE_URL}/api/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Could not fetch movie details. Please try again later.");
      }
    };
    fetchMovie();
    window.scrollTo(0, 0);
  }, [id]);

  const handlePersonClick = (personId, isActor) => {
    const selected = isActor
      ? actors.find((actor) => actor.id === personId || actor._id === personId)
      : producers.find((producer) => producer.id === personId || producer._id === personId);
    
    setSelectedPerson(selected);
  };

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="row mb-4">
        <div className="col-md-4">
          <img
            className="img-fluid rounded"
            src={movie.poster}
            alt={movie.name}
            style={{ height: "400px" }}
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
              movie.producers.map((producer) => (
                <div
                  className="text-center me-3 mb-4 icon-container"
                  key={producer.id || producer._id || producer.name}
                  onClick={() => handlePersonClick(producer.id || producer._id, false)}
                  style={{ cursor: "pointer", width: "80px" }}
                >
                  <IoPersonCircleOutline className="person-icon"  style={{color:'lightGrey'}} size={40} />
                  <div>{producer.name}</div>
                </div>
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
                  className="text-center me-3 mb-4 icon-container"
                  key={actor.id || actor._id || actor.name}
                  onClick={() => handlePersonClick(actor.id || actor._id, true)}
                  style={{ cursor: "pointer", width: "80px" }}
                >
                  <IoPersonCircleOutline className="person-icon"  style={{color:'lightGrey'}} size={40} />
                  <div>{actor.name}</div>
                </div>
              ))
            ) : (
              <p>No actor details available.</p>
            )}
          </div>
        </div>
      </div>

      {selectedPerson && (
        <div className="mt-4 p-3 border rounded">
          <h4 className="text-danger"> {selectedPerson.name}</h4>
          <p><strong>Gender:</strong> {selectedPerson.gender || "N/A"}</p>
          <p>
            <strong>Date of Birth:</strong>{" "}
            {selectedPerson.dob ? new Date(selectedPerson.dob).toLocaleDateString() : "N/A"}
          </p>
          <p><strong>Bio:</strong> {selectedPerson.bio || "No bio available"}</p>
        </div>
      )}
    </div>
  );
};

export default MyMovieDetails;




