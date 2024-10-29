// src/api/api.js
import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerUser = async (data) => {
    return await api.post('/register', data);
};

export const loginUser = async (data) => {
    return await api.post('/login', data);
};

export const getProfile = async (token) => {
    return await api.get('/profile', {
        headers: { Authorization: `Bearer ${token}` },
    });
};


export const updateScore = async (score, token) => {
    try {
        const response = await api.post(
            '/update-score', 
            { score }, // Puntaje en el cuerpo de la solicitud
            {
                headers: {
                    Authorization: `Bearer ${token}` // Incluye el token en el encabezado
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el puntaje:', error);
        throw error;
    }
};



