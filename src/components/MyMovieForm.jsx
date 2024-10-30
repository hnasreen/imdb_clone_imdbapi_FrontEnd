import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';
import MovieContext from '../context/MovieContext.jsx';

const MyMovieForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const { actors: existingActors, producers: existingProducers } = useContext(MovieContext);

    const [movie, setMovie] = useState({
        name: '',
        yearOfRelease: '',
        plot: '',
        poster: '',
        producers: [],
        actors: []
    });
    const [error, setError] = useState('');

    useEffect(() => {
        
        if (id) {
            const fetchMovie = async () => {
                try {
                    const res = await axios.get(`http://localhost:8080/api/${id}`);
                    setMovie({
                        name: res.data.name || '',
                        yearOfRelease: res.data.yearOfRelease || '',
                        plot: res.data.plot || '',
                        poster: res.data.poster || '',
                        producers: res.data.producers || [],
                        actors: res.data.actors || []
                    });
                } catch (error) {
                    setError('Error fetching movie details');
                    console.error('Error fetching movie details', error);
                }
            };
            fetchMovie();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        try {
            if (id) {
                await axios.put(`http://localhost:8080/api/${id}`, movie, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('http://localhost:8080/api/addMovie', movie, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            navigate('/movies');
        } catch (error) {
            setError('Error submitting movie form');
            console.error('Error submitting movie form', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-light text-center mb-4">{id ? 'Update Movie' : 'Add Movie'}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow">
               
                <div className="mb-3">
                    <label htmlFor="name" className="form-label text-light">Movie Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={movie.name}
                        onChange={(e) => setMovie(prevMovie => ({ ...prevMovie, name: e.target.value }))}
                        placeholder="Enter Movie Name"
                        required
                    />
                </div>

                
                <div className="mb-3">
                    <label htmlFor="yearOfRelease" className="form-label text-light">Year of Release</label>
                    <input
                        type="number"
                        className="form-control"
                        id="yearOfRelease"
                        name="yearOfRelease"
                        value={movie.yearOfRelease}
                        onChange={(e) => setMovie(prevMovie => ({ ...prevMovie, yearOfRelease: e.target.value }))}
                        placeholder="Enter Year of Release"
                        required
                    />
                </div>

               
                <div className="mb-3">
                    <label htmlFor="plot" className="form-label text-light">Plot</label>
                    <textarea
                        className="form-control"
                        id="plot"
                        name="plot"
                        value={movie.plot}
                        onChange={(e) => setMovie(prevMovie => ({ ...prevMovie, plot: e.target.value }))}
                        placeholder="Enter Plot"
                        required
                    />
                </div>

                
                <div className="mb-3">
                    <label htmlFor="poster" className="form-label text-light">Poster URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="poster"
                        name="poster"
                        value={movie.poster}
                        onChange={(e) => setMovie(prevMovie => ({ ...prevMovie, poster: e.target.value }))}
                        placeholder="Enter Poster URL"
                    />
                </div>

                {!id && (
                    <>
                        
                        <div className="mb-3">
                            <label htmlFor="producers" className="form-label text-light">Producer(s) <span style={{color:'red'}}> Kindly add the producer to select from the options •</span></label>
                            <select
                                className="form-select"
                                onChange={(e) => {
                                    const selectedProducer = e.target.value;
                                    if (selectedProducer && !movie.producers.includes(selectedProducer)) {
                                        setMovie(prev => ({ ...prev, producers: [...prev.producers, selectedProducer] }));
                                    }
                                }}
                                defaultValue=""
                            >
                                <option value="" disabled>Select a Producer</option>
                                {existingProducers.length > 0 ? (
                                    existingProducers.map((producer) => (
                                        <option key={producer._id} value={producer._id}>{producer.name}</option>
                                    ))
                                ) : (
                                    <option>No Producers Available</option>
                                )}
                            </select>
                            <div className="mt-2">
                                <h6 className="text-light">Added Producers:</h6>
                                <ul className="list-unstyled">
                                    {movie.producers.map((producerId, index) => (
                                        <li key={index} className="text-light">{producerId}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        
                        <div className="mb-3">
                            <label htmlFor="actors" className="form-label text-light">Actor(s) <span style={{color:'red'}}> Kindly add the actor to select from the options •</span></label>
                            <select
                                className="form-select"
                                onChange={(e) => {
                                    const selectedActor = e.target.value;
                                    if (selectedActor && !movie.actors.includes(selectedActor)) {
                                        setMovie(prev => ({ ...prev, actors: [...prev.actors, selectedActor] }));
                                    }
                                }}
                                defaultValue=""
                            >
                                <option value="" disabled>Select an Actor</option>
                                {existingActors.length > 0 ? (
                                    existingActors.map((actor) => (
                                        <option key={actor._id} value={actor._id}>{actor.name}</option>
                                    ))
                                ) : (
                                    <option>No Actors Available</option>
                                )}
                            </select>
                            <div className="mt-2">
                                <h6 className="text-light">Added Actors:</h6>
                                <ul className="list-unstyled">
                                    {movie.actors.map((actorId, index) => (
                                        <li key={index} className="text-light">{actorId}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </>
                )}

                <button type="submit" className="btn btn-primary w-100">{id ? 'Update' : 'Add'} Movie</button>
            </form>
        </div>
    );
};

export default MyMovieForm;
