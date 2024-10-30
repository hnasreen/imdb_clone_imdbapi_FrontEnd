import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
    const [actors, setActors] = useState([]);
    const [producers, setProducers] = useState([]);

    useEffect(() => {
        const fetchActorsAndProducers = async () => {
            const actorsRes = await axios.get('http://localhost:8080/api/actors');
            const producersRes = await axios.get('http://localhost:8080/api/producers');
            setActors(actorsRes.data);
            setProducers(producersRes.data);
        };
        fetchActorsAndProducers();
    }, []);


    return (
        <MovieContext.Provider value={{ actors, producers }}>
            {children}
        </MovieContext.Provider>
    );
};

export default MovieContext;