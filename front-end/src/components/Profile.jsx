import React, { useEffect, useState } from 'react';
import { getProfile } from '../api/api'; 
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css'; // Asegúrate de crear este archivo CSS

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                if (token) {
                    const response = await getProfile(token); 
                    setProfile(response.data);
                } else {
                    navigate('/'); 
                }
            } catch (error) {
                console.error('Error al obtener el perfil:', error);
                alert('Error al obtener el perfil');
            }
        };

        fetchUserProfile(); 
    }, [token, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/'); 
    };

    const goToInicio = () => {
        navigate('/inicio')
    }

    // Calcular la suma de los puntajes
    const totalScore = profile?.scores?.reduce((acc, score) => acc + score.score, 0) || 0;

    return (
        <div className="profile-container">
            {profile ? (
                <div>
                    <h2>{profile.username}</h2>
                    <p>Email: {profile.email}</p>
                    <h3>Puntuaciones:</h3>
                    <table className="score-table">
                        <thead>
                            <tr>
                                <th>Puntaje</th>
                                <th>Fecha de Actualización</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profile.scores && profile.scores.length > 0 ? (
                                profile.scores.map(score => (
                                    <tr key={score._id}>
                                        <td>{score.score}</td>
                                        <td>{score.updatedAt ? new Date(score.updatedAt).toLocaleString() : 'Fecha no disponible'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2">No hay puntuaciones disponibles.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {profile.scores && profile.scores.length > 0 && (
                        <h4>Total de Puntuaciones: {totalScore}</h4>
                    )}
                    <button onClick={goToInicio}>Regresar</button>
                    <button className='button-cerrar' onClick={handleLogout}>Cerrar sesión</button>
                </div>
            ) : (
                <p>Cargando perfil...</p>
            )}
        </div>
    );
};

export default Profile;
