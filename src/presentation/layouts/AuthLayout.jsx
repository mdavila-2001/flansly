// src/presentation/layouts/AuthLayout.jsx
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-flansly-dark w-full">
            {/* Aquí inyectará React router las pantallas de Login o Registro */}
            <Outlet />
        </div>
    );
};