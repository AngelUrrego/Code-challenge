// src/components/Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Si el token ya existe en el localStorage, redirige al inicio
        if (localStorage.getItem('token')) {
            navigate('/inicio');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ email, password });
            localStorage.setItem('token', response.data.token); // Guarda el token
            alert('Login exitoso');
            navigate('/inicio'); // Redirige al inicio después del login exitoso
        } catch (error) {
            alert('Error en contraseña/usuario');
        }
    };

    return (
        <>
    
        <div className='card'>
            <h1>Inicio de sesión</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Iniciar sesión</button>
            </form>
            <a href='/register' className='a-register'>Registrarse</a>
        </div>
        </>
    );
};

export default Login;
