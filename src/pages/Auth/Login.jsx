import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.API_BASE_URL}/api/login`, {
        email,
        password,
      });
    
      setToken(res?.data?.token); 
      if (res.data.success === true) {
        alert(res.data.message);
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px black solid",
          borderRadius: "10px",
          padding: "20px",
        }}
        onSubmit={handleSubmit}
      >
        <div>
          <label style={{ minWidth: "100px" }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label style={{ minWidth: "100px" }}>Password</label>
          <input
            type="password"
            autoComplete="true"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button
            className="bg-primary"
            style={{
              color: "white",
              borderRadius: "10px",
              border: "white",
              width: "100px",
              height: "30px",
              marginRight: "5px",
            }}
          >
            Login
          </button>
          <Link
            to="/register"
            style={{
              fontSize: "12px",
              textDecoration: "underline",
              color: "white",
            }}
          >
            New User?Register Now!
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
