// src/presentation/layouts/AuthLayout.jsx
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-flansly-dark flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-flansly-card border border-flansly-surface/50 rounded-2xl p-8 shadow-[0_0_50px_rgba(180,83,9,0.04)] animate-[slide-in_0.3s_ease]">
                {/* Logo Central de Marca */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-flansly-caramel to-flansly-flan flex items-center justify-center shadow-[0_0_20px_rgba(180,83,9,0.3)] text-2xl">
                        🍮
                    </div>
                    <h2 className="text-2xl font-extrabold text-flansly-flan font-['Manrope'] tracking-tight mt-3">
                        Flansly
                    </h2>
                    <p className="text-flansly-muted text-xs mt-1 font-['Inter']">
                        Gourmet Content Private Platform
                    </p>
                </div>
                
                {/* Aquí inyectará React router las pantallas de Login o Registro */}
                <Outlet />
            </div>
        </div>
    );
};