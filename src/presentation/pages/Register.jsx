import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../application/hooks/useAuth';
import { Input } from '../components/ui/Input';
import { Radio } from '../components/ui/Radio';
import { Button } from '../components/ui/Button';

export const Register = () => {
    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('creator'); // Selección de rol excluyente obligatorio
    const { submitRegister, isLoading, authError } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones básicas antes del submit
        if (!displayName.trim() || !username.trim() || !email.trim() || !password.trim()) {
            return;
        }

        try {
            await submitRegister({
                displayName: displayName.trim(),
                username: username.trim().toLowerCase(),
                email: email.trim().toLowerCase(),
                password,
                role
            });

            // Tras un registro exitoso, redirigimos a la pantalla de login
            navigate('/login');
        } catch (err) {
            // Error capturado y procesado por el hook 'useAuth'
        }
    };

    const roleOptions = [
        { value: 'creator', label: '🍮 Creador de Contenido (Recibe donaciones)' },
        { value: 'follower', label: '👥 Seguidor / Donador (Apoya y compra flanes)' }
    ];

    return (
        <div className="w-full flex justify-center items-center relative min-h-screen py-10">
            {/* Fondo: Resplandor difuminado caramelo */}
            <div className="absolute w-[60vw] h-[60vh] bg-radial from-[#B45309]/5 to-transparent blur-3xl pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />

            {/* Tarjeta Glassmorphic */}
            <div className="bg-[#1E1E1E] rounded-[2rem] p-8 md:p-10 shadow-[0_8px_32px_rgba(180,83,9,0.06)] border border-[#2A2A2A] w-full max-w-[480px] z-10 relative animate-[slide-in_0.3s_ease]">
                
                {/* Header Marca */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-flansly-caramel to-flansly-flan flex items-center justify-center shadow-[0_0_20px_rgba(180,83,9,0.3)] text-2xl mb-3">
                        🍮
                    </div>
                    <h1 className="font-bold text-3xl text-center text-[#FDE68A] tracking-[0.12em] font-['Manrope'] uppercase">
                        Unirse a Flansly
                    </h1>
                    <p className="text-flansly-muted/80 text-xs mt-1 text-center font-['Inter']">
                        Comienza a endulzar proyectos hoy mismo.
                    </p>
                </div>

                {/* Alerta de Error del Servidor */}
                {authError && (
                    <div className="bg-flansly-error/10 border border-flansly-error/30 text-flansly-error rounded-xl p-3 text-xs mb-4 animate-[slide-in_0.2s_ease] font-['Inter']">
                        ⚠️ {authError}
                    </div>
                )}

                {/* Formulario de Registro */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Nombre Completo"
                        type="text"
                        startIcon={User}
                        placeholder="Ej. Marcelo Pérez"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        disabled={isLoading}
                        required
                    />

                    <Input
                        label="Nombre de Usuario"
                        type="text"
                        startIcon={User}
                        placeholder="Ej. marcelo_creador"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={isLoading}
                        required
                    />

                    <Input
                        label="Correo Electrónico"
                        type="email"
                        startIcon={Mail}
                        placeholder="usuario@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                        required
                    />

                    <Input
                        label="Contraseña"
                        type="password"
                        startIcon={Lock}
                        placeholder="Mínimo 6 caracteres"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        required
                    />

                    {/* Selector de Rol Excluyente Obligatorio */}
                    <div className="pt-2 border-t border-flansly-surface/30">
                        <Radio
                            label="Tipo de Cuenta / Rol"
                            name="role"
                            options={roleOptions}
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            disabled={isLoading}
                            direction="vertical"
                        />
                    </div>

                    <Button
                        variant="primary"
                        className="w-full mt-6"
                        type="submit"
                        disabled={isLoading || !displayName.trim() || !username.trim() || !email.trim() || !password.trim()}
                    >
                        {isLoading ? 'Preparando la Cuenta...' : 'Hornear Nueva Cuenta'}
                    </Button>
                </form>

                {/* Enlace de Login */}
                <div className="text-center mt-6">
                    <p className="text-xs text-flansly-muted font-['Inter']">
                        ¿Ya tienes una cuenta?{' '}
                        <Link
                            to="/login"
                            className="text-[#FDE68A] hover:text-[#B45309] font-bold transition-colors"
                        >
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Register;
