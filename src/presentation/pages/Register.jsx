import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../application/hooks/useAuth';
import { Input } from '../components/ui/Input';
import { FileInput } from '../components/ui/FileInput';
import { Button } from '../components/ui/Button';

export const Register = () => {
    const [displayName, setDisplayName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('creator');
    const [avatarFile, setAvatarFile] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);

    const { submitRegister, isLoading, authError } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones básicas antes del submit
        if (!displayName.trim() || !username.trim() || !email.trim() || !password.trim()) {
            return;
        }

        try {
            // Nota de Arquitectura: Se respetan estrictamente las claves del Joi registerSchema
            // del backend para evitar errores de validación de llaves desconocidas.
            await submitRegister({
                displayName: displayName.trim(),
                username: username.trim().toLowerCase(),
                email: email.trim().toLowerCase(),
                password,
                role,
                avatar: avatarFile,
                banner: bannerFile
            });

            // Tras un registro exitoso, redirigimos a la pantalla de login
            navigate('/login');
        } catch (err) {
            console.error('Error durante submitRegister:', err.message);
        }
    };

    return (
        <div className="w-full flex justify-center items-center relative min-h-screen py-10 px-4 bg-flansly-dark overflow-hidden">
            <div className="absolute w-[60vw] h-[60vh] bg-radial from-flansly-caramel/5 to-transparent blur-3xl pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />

            <main className="w-full max-w-125 z-10 relative px-4">
                <div className="bg-flansly-card/80 backdrop-blur-xl rounded-4xl p-8 md:p-10 shadow-2xl border border-flansly-surface/50 animate-[slide-in_0.3s_ease]">
                    
                    <div className="flex flex-col items-center mb-6">
                        <h1 className="font-extrabold text-3xl text-center text-flansly-flan tracking-[0.12em] font-manrope uppercase">
                            Unirse a Flansly
                        </h1>
                        <p className="text-flansly-muted text-xs mt-1 text-center font-inter">
                            Comienza a endulzar proyectos hoy mismo.
                        </p>
                    </div>

                    <div className="flex p-1 bg-flansly-dark rounded-full mb-6 relative border border-flansly-surface/40 select-none">
                        <div 
                            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-flansly-card rounded-full shadow-md transition-all duration-300 ease-in-out border border-flansly-surface/50 ${
                                role === 'creator' ? 'left-1' : 'left-[50%]'
                            }`} 
                        />
                        <button
                            type="button"
                            onClick={() => setRole('creator')}
                            className={`flex-1 relative z-10 py-2.5 text-center text-xs font-black uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                                role === 'creator' ? 'text-flansly-flan' : 'text-flansly-muted hover:text-flansly-flan'
                            }`}
                        >
                            Soy Creador
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('follower')}
                            className={`flex-1 relative z-10 py-2.5 text-center text-xs font-black uppercase tracking-wider transition-colors duration-300 cursor-pointer ${
                                role === 'follower' ? 'text-flansly-flan' : 'text-flansly-muted hover:text-flansly-flan'
                            }`}
                        >
                            Soy Seguidor
                        </button>
                    </div>

                    {authError && (
                        <div className="bg-flansly-error/10 border border-flansly-error/30 text-flansly-error rounded-xl p-3 text-xs mb-5 flex items-center gap-2 animate-[slide-in_0.2s_ease] font-inter">
                            <AlertTriangle size={14} /> {authError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Usuario"
                                type="text"
                                startIcon={User}
                                placeholder="marcelo"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                            <Input
                                label="Nombre Público"
                                type="text"
                                startIcon={User}
                                placeholder="Marcelo Pérez"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                disabled={isLoading}
                                required
                            />
                        </div>

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

                        <div className="pt-2 border-t border-flansly-surface/30 animate-[slide-in_0.2s_ease]">
                            {role === 'creator' ? (
                                <div className="grid grid-cols-2 gap-4">
                                    <FileInput
                                        label="Foto de Perfil"
                                        accept="image/*"
                                        disabled={isLoading}
                                        onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                                    />
                                    <FileInput
                                        label="Banner de Portada"
                                        accept="image/*"
                                        disabled={isLoading}
                                        onChange={(e) => setBannerFile(e.target.files?.[0] || null)}
                                    />
                                </div>
                            ) : (
                                <FileInput
                                    label="Foto de Perfil"
                                    accept="image/*"
                                    disabled={isLoading}
                                    onChange={(e) => setAvatarFile(e.target.files?.[0] || null)}
                                />
                            )}
                        </div>

                        <Button
                            variant="primary"
                            className="w-full mt-6"
                            type="submit"
                            disabled={isLoading || !displayName.trim() || !username.trim() || !email.trim() || !password.trim()}
                            icon={ArrowRight}
                        >
                            {isLoading ? 'Preparando la Cuenta...' : 'Comenzar a Hornear'}
                        </Button>
                    </form>

                    <div className="text-center mt-8 pt-6 border-t border-flansly-surface/30">
                        <p className="text-xs text-flansly-muted font-inter">
                            ¿Ya tienes una cuenta?{' '}
                            <Link
                                to="/login"
                                className="text-flansly-flan hover:text-flansly-caramel font-bold transition-colors"
                            >
                                Inicia sesión aquí
                            </Link>
                        </p>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Register;
