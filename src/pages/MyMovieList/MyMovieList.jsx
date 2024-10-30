import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa"; 
import AuthContext from "../../context/AuthContext.jsx";
import "../MyMovieList/MyMovieList.css"; 

const MyMovieList = () => {
  const [movies, setMovies] = useState([]);
  const { token } = useContext(AuthContext);

  const fetchMovies = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/getAllMovie");
      setMovies(response.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/deleteMovie/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMovies();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div style={{ color: 'white', padding: '20px' }}>
      <h2>Movies</h2>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/add-movie" style={{ color: 'white', border: '1px solid white', borderRadius: '10px', padding: '5px', marginRight: '10px' }}>Add Movie</Link>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
        {movies.map((movie) => (
          <div key={movie._id} className="cards">
            <Link to={`/movie/${movie._id}`} style={{ textDecoration: "none", color: "white" }}>
              <img className="cards__img" src={movie.poster} alt={movie.name} />
              <div className="cards__overlay">
                <div className="card__title">{movie.name}</div>
                <div className="card__runtime">{movie.yearOfRelease}</div>
                <div className="card__description">{movie.plot}</div>
              </div>
            </Link>
            <FaEdit 
              onClick={() => (window.location.href = `/edit-movie/${movie._id}`)}
              style={{ 
                position: 'absolute', 
                top: '10px', 
                right: '50px', 
                cursor: 'pointer', 
                color: 'white', 
                fontSize: '20px' 
              }} 
            />
            <FaTrash 
              onClick={() => handleDelete(movie._id)} 
              style={{ 
                position: 'absolute', 
                top: '10px', 
                right: '10px', 
                cursor: 'pointer', 
                color: 'red', 
                fontSize: '20px' 
              }} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyMovieList;
