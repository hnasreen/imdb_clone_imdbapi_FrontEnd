import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext.jsx';


const AddActorForm = () => {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    
    const [actor, setActor] = useState({
        name: '',
        gender: '',
        dob: '',
        bio: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/addActor', actor, {
                headers: { Authorization: `Bearer ${token}` }
            });
           
            navigate('/movies'); 
        } catch (error) {
            setError('Error adding actor');
            console.error('Error adding actor', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-light text-center mb-4">Add Actor</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="bg-dark p-4 rounded shadow">
              
                <div className="mb-3">
                    <label htmlFor="name" className="form-label text-light">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={actor.name}
                        onChange={(e) => setActor({ ...actor, name: e.target.value })}
                        required
                    />
                </div>

           
                <div className="mb-3">
                    <label htmlFor="gender" className="form-label text-light">Gender</label>
                    <select
                        className="form-select"
                        id="gender"
                        value={actor.gender}
                        onChange={(e) => setActor({ ...actor, gender: e.target.value })}
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
                        value={actor.dob}
                        onChange={(e) => setActor({ ...actor, dob: e.target.value })}
                        required
                    />
                </div>

                
                <div className="mb-3">
                    <label htmlFor="bio" className="form-label text-light">Bio</label>
                    <textarea
                        className="form-control"
                        id="bio"
                        rows="4"
                        value={actor.bio}
                        onChange={(e) => setActor({ ...actor, bio: e.target.value })}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-100">Add Actor</button>
            </form>
        </div>
    );
};

export default AddActorForm;
