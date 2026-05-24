import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../../application/hooks/useAuth';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export const Login = () => {
    const [identity, setIdentity] = useState('');
    const [password, setPassword] = useState('');
    const [roleTab, setRoleTab] = useState('creator'); // Selección puramente estética en la UI
    const { submitLogin, isLoading, authError } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!identity.trim() || !password.trim()) return;

        try {
            const res = await submitLogin(identity, password);
            // Redirigir al dashboard/feed correspondiente según el rol decodificado
            if (res.role === 'creator') {
                navigate('/creator/dashboard', { replace: true });
            } else {
                navigate('/follower/feed', { replace: true });
            }
        } catch (err) {
            // El hook 'useAuth' ya se encarga de guardar y reportar el error en 'authError'
        }
    };

    return (
        <div className="w-full flex justify-center items-center relative min-h-screen">
            {/* Fondo: Resplandor difuminado caramelo */}
            <div className="absolute w-[60vw] h-[60vh] bg-radial from-[#B45309]/5 to-transparent blur-3xl pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />

            {/* Tarjeta Glassmorphic */}
            <div className="bg-[#1E1E1E] rounded-[2rem] p-8 md:p-10 shadow-[0_8px_32px_rgba(180,83,9,0.06)] border border-[#2A2A2A] w-full max-w-[450px] z-10 relative animate-[slide-in_0.3s_ease]">
                
                {/* Header Marca */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-flansly-caramel to-flansly-flan flex items-center justify-center shadow-[0_0_20px_rgba(180,83,9,0.3)] text-2xl mb-3 animate-[checkmark-pop_0.4s_ease]">
                        🍮
                    </div>
                    <h1 className="font-bold text-4xl text-center text-[#FDE68A] tracking-[0.15em] font-['Manrope'] uppercase">
                        Flansly
                    </h1>
                    <p className="text-flansly-muted/80 text-xs mt-1 text-center font-['Inter']">
                        El postre de los creadores.
                    </p>
                </div>

                {/* Pestañas Conmutadoras (Visuales y Estéticas) */}
                <div className="grid grid-cols-2 bg-[#121212] p-1 rounded-xl border border-flansly-surface/40 mb-6">
                    <button
                        type="button"
                        onClick={() => setRoleTab('creator')}
                        className={`py-2.5 rounded-lg text-[10px] font-bold transition-all duration-300 cursor-pointer uppercase tracking-wider text-center font-['Inter'] ${
                            roleTab === 'creator'
                                ? 'bg-[#B45309] text-[#FDE68A] shadow-[0_0_15px_rgba(180,83,9,0.25)]'
                                : 'text-flansly-muted hover:text-flansly-flan'
                        }`}
                    >
                        Soy Creador
                    </button>
                    <button
                        type="button"
                        onClick={() => setRoleTab('follower')}
                        className={`py-2.5 rounded-lg text-[10px] font-bold transition-all duration-300 cursor-pointer uppercase tracking-wider text-center font-['Inter'] ${
                            roleTab === 'follower'
                                ? 'bg-[#B45309] text-[#FDE68A] shadow-[0_0_15px_rgba(180,83,9,0.25)]'
                                : 'text-flansly-muted hover:text-flansly-flan'
                        }`}
                    >
                        Soy Seguidor
                    </button>
                </div>

                {/* Alerta de Error del Servidor */}
                {authError && (
                    <div className="bg-flansly-error/10 border border-flansly-error/30 text-flansly-error rounded-xl p-3 text-xs mb-4 animate-[slide-in_0.2s_ease] font-['Inter']">
                        ⚠️ {authError}
                    </div>
                )}

                {/* Formulario de Login */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Correo Electrónico o Usuario"
                        type="text"
                        startIcon={Mail}
                        placeholder="creador@ejemplo.com"
                        value={identity}
                        onChange={(e) => setIdentity(e.target.value)}
                        disabled={isLoading}
                        required
                    />

                    <Input
                        label="Contraseña"
                        type="password"
                        startIcon={Lock}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                        required
                    />

                    <Button
                        variant="primary"
                        className="w-full mt-6"
                        type="submit"
                        disabled={isLoading || !identity.trim() || !password.trim()}
                    >
                        {isLoading ? 'Entrando al Horno...' : 'Entrar al Horno'}
                    </Button>
                </form>

                {/* Enlace de Registro */}
                <div className="text-center mt-6">
                    <p className="text-xs text-flansly-muted font-['Inter']">
                        ¿No tienes una cuenta?{' '}
                        <Link
                            to="/register"
                            className="text-[#FDE68A] hover:text-[#B45309] font-bold transition-colors"
                        >
                            Regístrate aquí
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Login;
