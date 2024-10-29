import React, { useContext } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx";

const Header = () => {

  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null); 
    navigate("/"); 
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img
            className="header__icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
          />
        </Link>
        <Link to="/imdb_movies/popular" style={{ textDecoration: "none" }}>
          <span>Popular</span>
        </Link>
        <Link to="/imdb_movies/top_rated" style={{ textDecoration: "none" }}>
          <span>Top Rated</span>
        </Link>
        <Link to="/imdb_movies/upcoming" style={{ textDecoration: "none" }}>
          <span>Upcoming</span>
        </Link>
        {token && (
          <Link to="/movies" style={{ textDecoration: "none" }}>
            <span>MyMovieListing</span>
          </Link>
        )}
      </div>
      <div className="headerRight">
      {token ? (
          <button
            onClick={handleLogout}
            style={{
              marginRight: "10px",
              color: 'white',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/register" style={{ marginRight: "10px", color: 'white' }}>
              Register
            </Link>
            <div>|</div>
            <Link to="/login" style={{ marginLeft: "10px", color: 'white' }}>
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

        

export default Header;
