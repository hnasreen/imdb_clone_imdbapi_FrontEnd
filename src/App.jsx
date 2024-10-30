import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home.jsx";
import MovieList from "./components/MovieList/MovieList.jsx";
import Movie from "./pages/MovieDetails/Movie.jsx";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import MyMovieList from "./pages/MyMovieList/MyMovieList.jsx";
import MyMovieDetails from "./components/MyMovieDetails/MyMovieDetails.jsx";
import MyMovieForm from "./components/Forms/MyMovieForm.jsx";
import { AuthProvider } from "./context/AuthContext.jsx"; 
import { MovieProvider } from "./context/MovieContext.jsx";
import AddActorForm from "./components/Forms/AddActorForm.jsx";
import AddProducerForm from "./components/Forms/AddProducerForm.jsx";


function App() {
  return (
    <AuthProvider>
        <MovieProvider>
        <div className="App">
          <Router>
            <Header />
            <Routes>
              <Route index element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

          
              <Route path="movies/:id" element={<Movie />} />
              <Route path="imdb_movies/:type" element={<MovieList />} />

              
                <Route path="/movies" element={<MyMovieList />} />
                <Route path="/movie/:id" element={<MyMovieDetails />} />
                <Route path="/add-movie" element={<MyMovieForm />} />
                <Route path="/addProducer" element = {<AddProducerForm/>}/>
                <Route path="/addActor" element = {<AddActorForm/>}/>
                <Route path="/edit-movie/:id" element={<MyMovieForm />} />
             

              
              <Route path="/*" element={<h1>Error Page</h1>} />
            </Routes>
          </Router>
        </div>
        </MovieProvider>
    </AuthProvider>
  );
}

export default App;
