import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext.jsx';
import MovieContext from '../../context/MovieContext.jsx';

const AddProducerForm = () => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const { producers, setProducers } = useContext(MovieContext);

    const [producer, setProducer] = useState({
        name: '',
        gender: '',
        dob: '',
        bio: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); 

        // Validate fields
        if (!producer.name || !producer.gender || !producer.dob || !producer.bio) {
            setError('All fields are required.');
            return;
        }

        // Validate date of birth
        const today = new Date();
        const dob = new Date(producer.dob);
        if (dob > today) {
            setError('Date of birth must be today or earlier.');
            return;
        }

        try {
            const res = await axios.post("https://imdb-clone-backend-j632.onrender.com/api/addProducer", producer, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProducers([...producers, res.data.producer]);
            navigate('/add-movie'); 
        } catch (error) {
            setError('Error adding producer');
            console.error('Error adding producer', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-light text-center mb-4">Add Producer</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow">
                
                <div className="mb-3">
                    <label htmlFor="name" className="form-label text-light">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={producer.name}
                        onChange={(e) => setProducer({ ...producer, name: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="gender" className="form-label text-light">Gender</label>
                    <select
                        className="form-select"
                        id="gender"
                        value={producer.gender}
                        onChange={(e) => setProducer({ ...producer, gender: e.target.value })}
                        required
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="dob" className="form-label text-light">Date of Birth</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dob"
                        value={producer.dob}
                        onChange={(e) => setProducer({ ...producer, dob: e.target.value })}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="bio" className="form-label text-light">Bio</label>
                    <textarea
                        className="form-control"
                        id="bio"
                        rows="4"
                        value={producer.bio}
                        onChange={(e) => setProducer({ ...producer, bio: e.target.value })}
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">Add Producer</button>
            </form>
        </div>
    );
};

export default AddProducerForm;
