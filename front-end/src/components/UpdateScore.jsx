// src/components/UpdateScore.jsx
import React, { useState } from 'react';
import { updateScore } from '../api/api';
import { useNavigate } from 'react-router-dom';

const UpdateScore = () => {
    const [score, setScore] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    
    //Funcion para actualizar puntaje
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Token:", token);
        console.log("Score:", score);
        if (!token) {
            alert("No hay token de autenticación");
            return;
        }
        // Convertir score a número
        const scoreNumber = parseInt(score, 10); 
        try {
            await updateScore(scoreNumber, token);
            alert('Puntaje actualizado');
            setScore('');
        } catch (error) {
            console.error('Error al actualizar el puntaje:', error.response);
            alert(`Error al actualizar el puntaje: ${error.response?.data?.message || 'Inténtalo de nuevo'}`);
        }
    };
 
    //Funcion para que envie al Inicio
    const goToInicio = () => {
        navigate('/inicio')
    }
    

    return (
        <div className='card'>
            <h1>Ingresa un puntaje</h1>
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder="Nuevo Puntaje" value={score} onChange={(e) => setScore(e.target.value)} required />
                <button type="submit">Actualizar Puntaje</button>
            </form>
            <button onClick={goToInicio} type="submit">Regresar</button>
        </div>
        
    );
};

export default UpdateScore;
