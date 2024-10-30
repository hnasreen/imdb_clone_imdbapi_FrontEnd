import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext.jsx';
import MovieContext from '../../context/MovieContext.jsx';

const MyMovieForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const { actors: existingActors, producers: existingProducers, fetchActorsAndProducers } = useContext(MovieContext);

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
                    const res = await axios.get(`https://imdb-clone-backend-j632.onrender.com/api/${id}`);
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

    // Validation function
    const validateForm = () => {
        if (!movie.name) {
            setError('Movie name is required.');
            return false;
        }
        if (!movie.yearOfRelease) {
            setError('Year of release is required.');
            return false;
        }
        if (movie.yearOfRelease < 1888) { 
            setError('Year of release must be 1888 or later.');
            return false;
        }
        if (!movie.plot) {
            setError('Plot is required.');
            return false;
        }
        if (movie.poster && !/^https?:\/\//.test(movie.poster)) {
            setError('Poster URL must be a valid URL starting with http:// or https://.');
            return false;
        }
        if (movie.producers.length === 0) {
            setError('At least one producer must be selected.');
            return false;
        }
        if (movie.actors.length === 0) {
            setError('At least one actor must be selected.');
            return false;
        }

        setError(''); 
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; 

        try {
            if (id) {
                await axios.put(`https://imdb-clone-backend-j632.onrender.com/api/${id}`, movie, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post('https://imdb-clone-backend-j632.onrender.com/api/addMovie', movie, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
           
            navigate('/movies');
        } catch (error) {
            setError('Error submitting movie form');
            console.error('Error submitting movie form', error);
        }
    };

    const handleAddActor = (e) => {
        e.preventDefault();
        if (newActor && !movie.actors.includes(newActor)) {
            setMovie(prev => ({ ...prev, actors: [...prev.actors, newActor] }));
            setNewActor('');
        }
    };

    const handleAddProducer = (e) => {
        e.preventDefault();
        if (newProducer && !movie.producers.includes(newProducer)) {
            setMovie(prev => ({ ...prev, producers: [...prev.producers, newProducer] }));
            setNewProducer('');
        }
    };

    const handleNavigateToAddActor = () => {
        navigate('/addActor'); 
    };

    const handleNavigateToAddProducer = () => {
        navigate('/addProducer'); 
    };

    return (
        <div className="container mt-5">
            <h2 className="text-light text-center mb-4">{id ? 'Update Movie' : 'Add Movie'}</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow">
                <h5 style={{textAlign:'center',color:'red'}}>* Kindly add the actor(s) and producer(s) first, if the actor/producer is not available in the select options</h5>
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
                            <label htmlFor="producers" className="form-label text-light">Producer(s) <span style={{ color: 'red' }}> Kindly add the producer to select from the options •</span></label>
                            <div className="d-flex align-items-center">
                                <select
                                    className="form-select me-2" 
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
                                <button type="button" className="btn btn-light border rounded" onClick={handleNavigateToAddProducer}>
                                    Add Producer
                                </button>
                            </div>
                            <h6 className="text-light">Added Producers:</h6>
                            <ul className="list-unstyled">
                                {movie.producers.map((producerId, index) => (
                                    <li key={index} className="text-light">{producerId}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="actors" className="form-label text-light">Actor(s) <span style={{ color: 'red' }}> Kindly add the actor to select from the options •</span></label>
                            <div className="d-flex align-items-center">
                                <select
                                    className="form-select me-2" 
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
                                <button type="button" className="btn btn-light border rounded" onClick={handleNavigateToAddActor}>
                                    Add Actor
                                </button>
                            </div>
                            <h6 className="text-light">Added Actors:</h6>
                            <ul className="list-unstyled">
                                {movie.actors.map((actorId, index) => (
                                    <li key={index} className="text-light">{actorId}</li>
                                ))}
                            </ul>
                        </div>
                    </>
                )}

                <div className="d-flex justify-content-center mt-4"> 
                    <button type="submit" className="btn btn-primary">
                        {id ? 'Update Movie' : 'Add Movie'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MyMovieForm;


