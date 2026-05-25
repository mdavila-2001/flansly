import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertTriangle } from 'lucide-react';
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
        } catch {
            // El hook 'useAuth' ya se encarga de guardar e imprimir el error.
            // Limpiamos 'err' inactivo para cumplir con las reglas estrictas del linter.
        }
    };

    return (
        <div className="grid lg:grid-cols-2 h-screen bg-flansly-dark w-full overflow-hidden">
            <div className="hidden lg:block relative h-screen w-full overflow-hidden select-none">
                <img 
                    alt="Gourmet flan dessert" 
                    className="absolute inset-0 w-full h-full object-cover" 
                    src="/flansly.png"
                />
                <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/80 z-10" />
            </div>

            <div className="flex flex-col items-center justify-center h-screen p-4 md:p-8 relative z-10 w-full">
                <div className="absolute w-[60vw] h-[60vh] bg-radial from-flansly-caramel/5 to-transparent blur-3xl pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />

                <main className="w-full max-w-[460px] z-10 relative px-4">
                    <div className="bg-flansly-card/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-2xl border border-flansly-surface/50 animate-[slide-in_0.3s_ease]">
                        
                        <div className="flex flex-col items-center mb-8">
                            <h1 className="font-extrabold text-4xl text-center text-flansly-flan tracking-[0.12em] font-manrope uppercase">
                                Flansly
                            </h1>
                            <p className="text-flansly-muted/80 text-xs mt-1 text-center font-inter">
                                El postre de los creadores.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 bg-[#121212] p-1 rounded-full border border-flansly-surface/40 mb-8 relative select-none">
                            <div 
                                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-flansly-card rounded-full shadow-md transition-all duration-300 ease-in-out border border-flansly-surface/50 ${
                                    roleTab === 'creator' ? 'left-1' : 'left-[50%]'
                                }`} 
                            />
                            <button
                                type="button"
                                onClick={() => setRoleTab('creator')}
                                className={`py-2.5 rounded-full text-[10px] font-black transition-all duration-300 cursor-pointer uppercase tracking-wider text-center font-inter relative z-10 ${
                                    roleTab === 'creator'
                                        ? 'text-flansly-flan'
                                        : 'text-flansly-muted hover:text-flansly-flan'
                                }`}
                            >
                                Soy Creador
                            </button>
                            <button
                                type="button"
                                onClick={() => setRoleTab('follower')}
                                className={`py-2.5 rounded-full text-[10px] font-black transition-all duration-300 cursor-pointer uppercase tracking-wider text-center font-inter relative z-10 ${
                                    roleTab === 'follower'
                                        ? 'text-flansly-flan'
                                        : 'text-flansly-muted hover:text-flansly-flan'
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

                        <form onSubmit={handleSubmit} className="space-y-5">
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

                            <div className="flex justify-end pt-1">
                                <a 
                                    href="#" 
                                    className="text-xs text-flansly-muted hover:text-flansly-flan transition-colors duration-200 font-inter"
                                >
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>

                            <Button
                                variant="primary"
                                className="w-full mt-6"
                                type="submit"
                                disabled={isLoading || !identity.trim() || !password.trim()}
                                icon={ArrowRight}
                            >
                                {isLoading ? 'Entrando al Horno...' : 'Entrar al Horno'}
                            </Button>
                        </form>

                        <div className="text-center mt-8 pt-6 border-t border-flansly-surface/30">
                            <p className="text-xs text-flansly-muted font-inter">
                                ¿No tienes una cuenta?{' '}
                                <Link
                                    to="/register"
                                    className="text-flansly-flan hover:text-flansly-caramel font-bold transition-colors"
                                >
                                    Regístrate aquí
                                </Link>
                            </p>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default Login;
