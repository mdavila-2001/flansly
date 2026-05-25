import { useState, useRef, useEffect } from 'react';
import { useCreator } from '../../application/hooks/useCreator';
import { useAuth } from '../../application/hooks/useAuth';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { FileInput } from '../components/ui/FileInput';
import { Button } from '../components/ui/Button';
import { Palette, Target, Save, CheckCircle } from 'lucide-react';
import { resolveImageUrl } from '../../core/utils/image.utils';

export const CreatorProfile = () => {
    const { user } = useAuth();
    const { 
        activeGoal, 
        isLoading, 
        creatorError, 
        handleUpdateProfile, 
        handleUpdateGoal 
    } = useCreator();

    // Estados para Perfil Visual
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [avatarFile, setAvatarFile] = useState(null);
    const [bannerFile, setBannerFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(user?.profileImageUrl || '/flansly_logo.png');
    const [bannerPreview, setBannerPreview] = useState(user?.bannerImageUrl || '');
    const [profileSuccess, setProfileSuccess] = useState(false);

    // Estados para Metas de Apoyo
    const [goalTitle, setGoalTitle] = useState(activeGoal?.title || '');
    const [goalDescription, setGoalDescription] = useState(activeGoal?.description || '');
    const [goalSuccess, setGoalSuccess] = useState(false);

    // Refs para File Inputs
    const avatarInputRef = useRef(null);
    const bannerInputRef = useRef(null);

    // Sincronizar estados locales cuando cambie la meta persistida de forma asíncrona para evitar cascading renders
    useEffect(() => {
        if (activeGoal) {
            const timer = setTimeout(() => {
                setGoalTitle(activeGoal.title);
                setGoalDescription(activeGoal.description);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [activeGoal]);

    // Manejar cambios e previsualizaciones instantáneas
    const handleAvatarChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleBannerChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setBannerFile(file);
            setBannerPreview(URL.createObjectURL(file));
        }
    };

    // Envío del Perfil Visual (FormData)
    const handleSubmitProfile = async (e) => {
        e.preventDefault();
        setProfileSuccess(false);

        try {
            const formData = new FormData();
            formData.append('displayName', displayName.trim());
            if (avatarFile) {
                formData.append('avatar', avatarFile);
            }
            if (bannerFile) {
                formData.append('banner', bannerFile);
            }

            await handleUpdateProfile(formData);
            setProfileSuccess(true);
            setTimeout(() => setProfileSuccess(false), 4000);
        } catch (err) {
            console.error('Error al actualizar perfil visual:', err);
        }
    };

    // Envío de la Meta de Apoyo (JSON)
    const handleSubmitGoal = async (e) => {
        e.preventDefault();
        setGoalSuccess(false);
        if (!goalTitle.trim() || !goalDescription.trim()) return;

        try {
            await handleUpdateGoal({
                title: goalTitle.trim(),
                description: goalDescription.trim()
            });
            setGoalSuccess(true);
            setTimeout(() => setGoalSuccess(false), 4000);
        } catch (err) {
            console.error('Error al actualizar meta de apoyo:', err);
        }
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            {/* Header Perfil */}
            <div className="border-b border-flansly-surface/30 pb-6">
                <h2 className="text-3xl font-extrabold text-[#F9F9F9] font-['Manrope'] tracking-tight flex items-center gap-2">
                    ⚙️ Configuración del Canal
                </h2>
                <p className="text-flansly-muted text-sm mt-1">
                    Personaliza la identidad visual de tu marca y define tus incentivos de recaudación.
                </p>
            </div>

            {/* Alerta de Errores */}
            {creatorError && (
                <div className="bg-flansly-error/10 border border-flansly-error/30 text-flansly-error rounded-xl p-4 text-xs animate-[slide-in_0.2s_ease]">
                    ⚠️ {creatorError}
                </div>
            )}

            <div className="bg-flansly-card rounded-4xl p-6 md:p-8 border border-flansly-surface/30 shadow-xl">
                <h3 className="text-lg font-bold text-flansly-flan font-['Manrope'] mb-6 flex items-center gap-2">
                    <Palette size={18} className="text-flansly-caramel" />
                    Identidad Visual del Creador
                </h3>

                {profileSuccess && (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl p-3 text-xs mb-6 flex items-center gap-2 animate-[slide-in_0.2s_ease] font-['Inter']">
                        <CheckCircle size={16} /> ¡Perfil visual actualizado con éxito!
                    </div>
                )}

                <form onSubmit={handleSubmitProfile} className="space-y-6">
                    {/* Estructura Estética Estricta: Banner rectangular y Foto circular flotante superpuesta */}
                    <div className="space-y-2">
                        <label className="text-flansly-muted text-sm font-['Inter'] tracking-wide block">
                            Diseño de Cabecera y Avatar
                        </label>
                        
                        <div className="relative mb-20">
                            {/* Rectángulo de Banner */}
                            <div className="w-full h-48 bg-flansly-dark/60 rounded-2xl overflow-hidden relative border border-flansly-surface/30 flex items-center justify-center">
                                {bannerPreview ? (
                                    <img 
                                        src={bannerPreview.startsWith('blob:') ? bannerPreview : resolveImageUrl(bannerPreview)} 
                                        alt="Banner Preview" 
                                        className="w-full h-full object-cover" 
                                    />
                                ) : (
                                    <span className="text-xs text-flansly-muted font-mono uppercase tracking-widest">Banner sin imagen</span>
                                )}
                            </div>

                            <div className="absolute -bottom-14 left-8 z-20">
                                <div className="relative group">
                                    <img 
                                        src={avatarPreview.startsWith('blob:') || avatarPreview.startsWith('/flansly_') ? avatarPreview : resolveImageUrl(avatarPreview)} 
                                        alt="Avatar Preview" 
                                        className="w-28 h-28 rounded-full border-4 border-flansly-surface/30 object-cover shadow-[0_0_20px_rgba(180,83,9,0.3)] bg-flansly-surface ring-2 ring-flansly-caramel/50 transition-transform duration-300 hover:scale-105" 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Doble FileInput Autónomo */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <FileInput
                            ref={avatarInputRef}
                            label="Cambiar Foto de Perfil (Avatar)"
                            accept="image/*"
                            disabled={isLoading}
                            onChange={handleAvatarChange}
                        />

                        <FileInput
                            ref={bannerInputRef}
                            label="Cambiar Fondo de Portada (Banner)"
                            accept="image/*"
                            disabled={isLoading}
                            onChange={handleBannerChange}
                        />
                    </div>

                    {/* Nombre a Mostrar */}
                    <div className="pt-2">
                        <Input
                            label="Nombre a Mostrar (Display Name)"
                            type="text"
                            placeholder="Ej. Chef Gourmet"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <div className="flex justify-end pt-4 border-t border-flansly-surface/30">
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isLoading || !displayName.trim()}
                            icon={Save}
                            className="min-w-44"
                        >
                            {isLoading ? 'Guardando Identidad...' : 'Guardar Identidad'}
                        </Button>
                    </div>
                </form>
            </div>

            <div className="bg-flansly-card rounded-4xl p-6 md:p-8 border border-flansly-surface/30 shadow-xl">
                <h3 className="text-lg font-bold text-flansly-flan font-['Manrope'] mb-6 flex items-center gap-2">
                    <Target size={18} className="text-flansly-caramel" />
                    Meta de Apoyo Operativa
                </h3>

                {goalSuccess && (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-xl p-3 text-xs mb-6 flex items-center gap-2 animate-[slide-in_0.2s_ease] font-['Inter']">
                        <CheckCircle size={16} /> ¡Meta de apoyo y soporte guardada!
                    </div>
                )}

                <form onSubmit={handleSubmitGoal} className="space-y-4">
                    <Input
                        label="Título del Incentivo"
                        type="text"
                        placeholder="Ej. Comprar un horno industrial de repostería"
                        value={goalTitle}
                        onChange={(e) => setGoalTitle(e.target.value)}
                        disabled={isLoading}
                        maxLength={150}
                        required
                    />

                    <Textarea
                        label="Descripción detallada de la Meta"
                        placeholder="Explica a tus seguidores en qué se invertirá el dinero de los flanes donados..."
                        value={goalDescription}
                        onChange={(e) => setGoalDescription(e.target.value)}
                        disabled={isLoading}
                        maxLength={500}
                        required
                    />

                    <div className="flex justify-end pt-4 border-t border-flansly-surface/30">
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={isLoading || !goalTitle.trim() || !goalDescription.trim()}
                            icon={Save}
                            className="min-w-44"
                        >
                            {isLoading ? 'Actualizando Meta...' : 'Actualizar Meta'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatorProfile;
