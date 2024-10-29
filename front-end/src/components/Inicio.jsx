import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/inicio.css';

//Funcion inicio dirige a las diferentes rutas
function Inicio() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/'); 
    };

    const goToProfile = () => {
        navigate('/profile'); // Redirige a la ruta de perfil
    };

    const goToScore = () => {
        navigate('/scores'); // Redirige a la ruta de puntuación
    };

    

    return (
        <>
            <div className='header'>
                <button className='buttones' onClick={goToProfile}>Perfil</button>
                <button className='buttones' onClick={goToScore}>Ingresar Puntuación</button>
                <button className='button-cerrar' onClick={handleLogout}>Cerrar sesión</button>
            </div>  
            <div className='inicio'>
                <h1>
                    Bienvenido, aquí podrás llevar un control de tus puntajes.
                </h1>
                {/* Agrega más contenido o mensajes informativos aquí */}
                <p>Utiliza los botones de arriba para acceder a tu perfil o ingresar tu puntuación.</p>
            </div>
        </>
    );
}

export default Inicio;
