import { useState, useRef, useCallback } from 'react';
import { Input } from './presentation/components/ui/Input';
import { Select } from './presentation/components/ui/Select';
import { Textarea } from './presentation/components/ui/Textarea';
import { Checkbox } from './presentation/components/ui/Checkbox';
import { Radio } from './presentation/components/ui/Radio';
import { Switch } from './presentation/components/ui/Switch';
import { Slider } from './presentation/components/ui/Slider';
import { FileInput } from './presentation/components/ui/FileInput';
import { Button } from './presentation/components/ui/Button';
import {
    User, Mail, Phone, Search, Lock, Hash, Calendar, Palette,
    Globe, Terminal, ChevronDown, ChevronUp
} from 'lucide-react';

const INITIAL_STATE = {
    text: '',
    email: '',
    tel: '',
    search: '',
    password: '',
    url: '',
    number: 25,
    date: '',
    time: '',
    datetime: '',
    color: '#B45309',
    select: '',
    textarea: '',
    checkbox1: false,
    checkbox2: true,
    checkbox3: false,
    radio: 'flan',
    switch1: true,
    switch2: false,
    slider: 65,
    file: null,
};

function AppTest() {
    const [form, setForm] = useState(INITIAL_STATE);
    const [mode, setMode] = useState('normal'); // 'normal' | 'error' | 'disabled'
    const [consoleOpen, setConsoleOpen] = useState(true);
    const fileRef = useRef(null);

    const set = useCallback((key) => (e) => {
        const val = e?.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e;
        setForm(prev => ({ ...prev, [key]: val }));
    }, []);

    const isDisabled = mode === 'disabled';
    const errorMsg = mode === 'error' ? 'Este campo tiene un error de validación' : undefined;

    const selectOptions = [
        { value: 'vainilla', label: '🍦 Vainilla' },
        { value: 'chocolate', label: '🍫 Chocolate' },
        { value: 'fresa', label: '🍓 Fresa' },
        { value: 'caramelo', label: '🍮 Caramelo' },
        { value: 'dulce-de-leche', label: '🥛 Dulce de Leche' },
    ];

    const radioOptions = [
        { value: 'flan', label: '🍮 Flan Clásico' },
        { value: 'cheesecake', label: '🍰 Cheesecake' },
        { value: 'tres-leches', label: '🥛 Tres Leches' },
        { value: 'tiramisu', label: '☕ Tiramisú' },
    ];

    return (
        <div className="min-h-screen bg-flansly-dark">
            {/* ── Header Glassmorphic ── */}
            <header className="sticky top-0 z-40 backdrop-blur-xl bg-flansly-dark/70 border-b border-flansly-surface/50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-linear-to-br from-flansly-caramel to-flansly-flan flex items-center justify-center shadow-[0_0_20px_rgba(180,83,9,0.3)]">
                            <span className="text-lg">🍮</span>
                        </div>
                        <div>
                            <h1 className="text-xl text-flansly-flan font(--font-manrope) tracking-tight">
                                Flansly UI
                            </h1>
                            <p className="text-[11px] text-flansly-muted -mt-0.5 font-mono">
                                Input Components Playground
                            </p>
                        </div>
                    </div>

                    {/* ── Mode Selector ── */}
                    <div className="flex items-center gap-2 bg-flansly-card rounded-xl p-1 border border-flansly-surface/50">
                    {[
                        { key: 'normal', label: 'Normal', emoji: '✅' },
                        { key: 'error', label: 'Error', emoji: '❌' },
                        { key: 'disabled', label: 'Disabled', emoji: '🚫' },
                    ].map(m => (
                        <button
                            key={m.key}
                            onClick={() => setMode(m.key)}
                            className={`
                                px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer
                                ${mode === m.key
                                    ? 'bg-flansly-caramel text-flansly-flan shadow-[0_0_10px_rgba(180,83,9,0.3)]'
                                    : 'text-flansly-muted hover:text-flansly-flan hover:bg-flansly-surface/50'
                                }
                            `}
                        >
                            {m.emoji} {m.label}
                        </button>
                    ))}
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8 flex gap-6">
                {/* ── Main Form Grid ── */}
                <div className="flex-1 space-y-8">

                    <section className='bg-flansly-card/50 backdrop-blur-sm rounded-2xl p-6 border border-flansly-surface/30'>
                        <h2>Botones</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            <Button
                                variant='primary'
                                children={
                                    <p>
                                        Botón Primario
                                    </p>
                                }
                            />

                            <Button
                                variant='secondary'
                                children={
                                    <p>
                                        Botón Secundario
                                    </p>
                                }
                            />
                        </div>
                    </section>
                    
                    {/* ━━ SECCIÓN 1: Texto & Búsqueda ━━ */}
                    <section className="bg-flansly-card/50 backdrop-blur-sm rounded-2xl p-6 border border-flansly-surface/30">
                        <h2 className="text-lg text-flansly-flan font(--font-manrope) mb-1 flex items-center gap-2">
                            <User size={18} className="text-flansly-caramel" />
                            Campos de Texto
                        </h2>
                        <p className="text-flansly-muted text-xs mb-5">text · email · tel · search · password · url</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Input
                                label="Texto"
                                type="text"
                                placeholder="Escribe tu nombre..."
                                startIcon={User}
                                value={form.text}
                                onChange={set('text')}
                                error={errorMsg}
                                disabled={isDisabled}
                            />
                            <Input
                                label="Email"
                                type="email"
                                placeholder="usuario@flansly.com"
                                startIcon={Mail}
                                value={form.email}
                                onChange={set('email')}
                                error={errorMsg}
                                disabled={isDisabled}
                            />
                            <Input
                                label="Teléfono"
                                type="tel"
                                placeholder="+591 70000000"
                                startIcon={Phone}
                                value={form.tel}
                                onChange={set('tel')}
                                error={errorMsg}
                                disabled={isDisabled}
                            />
                            <Input
                                label="Búsqueda"
                                type="search"
                                placeholder="Buscar postres..."
                                startIcon={Search}
                                value={form.search}
                                onChange={set('search')}
                                error={errorMsg}
                                disabled={isDisabled}
                            />
                            <Input
                                label="Contraseña"
                                type="password"
                                placeholder="••••••••"
                                startIcon={Lock}
                                value={form.password}
                                onChange={set('password')}
                                error={errorMsg}
                                disabled={isDisabled}
                            />
                            <Input
                                label="URL"
                                type="url"
                                placeholder="https://flansly.com"
                                startIcon={Globe}
                                value={form.url}
                                onChange={set('url')}
                                error={errorMsg}
                                disabled={isDisabled}
                            />
                        </div>
                    </section>

                    {/* ━━ SECCIÓN 2: Valores & Fechas ━━ */}
                    <section className="bg-flansly-card/50 backdrop-blur-sm rounded-2xl p-6 border border-flansly-surface/30">
                        <h2 className="text-lg text-flansly-flan font(--font-manrope) mb-1 flex items-center gap-2">
                            <Calendar size={18} className="text-flansly-caramel" />
                            Valores y Fechas
                        </h2>
                        <p className="text-flansly-muted text-xs mb-5">number · date · time · datetime-local · color</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Input
                                label="Número"
                                type="number"
                                placeholder="0"
                                min={0}
                                max={999}
                                step={1}
                                startIcon={Hash}
                                value={form.number}
                                onChange={set('number')}
                                error={errorMsg}
                                disabled={isDisabled}
                            />
                            <Input
                                label="Fecha"
                                type="date"
                                value={form.date}
                                onChange={set('date')}
                                error={errorMsg}
                                disabled={isDisabled}
                            />
                            <Input
                                label="Hora"
                                type="time"
                                value={form.time}
                                onChange={set('time')}
                                error={errorMsg}
                                disabled={isDisabled}
                            />
                            <Input
                                label="Fecha y Hora"
                                type="datetime-local"
                                value={form.datetime}
                                onChange={set('datetime')}
                                error={errorMsg}
                                disabled={isDisabled}
                            />
                            <Input
                                label="Color"
                                type="color"
                                value={form.color}
                                onChange={set('color')}
                                error={errorMsg}
                                disabled={isDisabled}
                            />
                        </div>
                    </section>

                    {/* ━━ SECCIÓN 3: Select & Textarea ━━ */}
                    <section className="bg-flansly-card/50 backdrop-blur-sm rounded-2xl p-6 border border-flansly-surface/30">
                        <h2 className="text-lg text-flansly-flan font(--font-manrope) mb-1 flex items-center gap-2">
                            <ChevronDown size={18} className="text-flansly-caramel" />
                            Selectores
                        </h2>
                        <p className="text-flansly-muted text-xs mb-5">select · textarea</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Select
                                label="Sabor Favorito"
                                options={selectOptions}
                                placeholder="Elige un sabor..."
                                value={form.select}
                                onChange={set('select')}
                                error={errorMsg}
                                disabled={isDisabled}
                            />
                            <Textarea
                                label="Descripción"
                                placeholder="Cuéntanos sobre tu postre favorito..."
                                maxLength={200}
                                value={form.textarea}
                                onChange={set('textarea')}
                                error={errorMsg}
                                disabled={isDisabled}
                            />
                        </div>
                    </section>

                    {/* ━━ SECCIÓN 4: Interactivos ━━ */}
                    <section className="bg-flansly-card/50 backdrop-blur-sm rounded-2xl p-6 border border-flansly-surface/30">
                        <h2 className="text-lg text-flansly-flan font(--font-manrope) mb-1 flex items-center gap-2">
                            <Palette size={18} className="text-flansly-caramel" />
                            Interactivos
                        </h2>
                        <p className="text-flansly-muted text-xs mb-5">checkbox · radio · switch · range</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Checkboxes */}
                            <div className="space-y-3">
                                <p className="text-flansly-muted text-xs font-medium uppercase tracking-wider mb-2">Checkboxes</p>
                                <Checkbox
                                    label="Acepto los términos y condiciones"
                                    checked={form.checkbox1}
                                    onChange={set('checkbox1')}
                                    error={mode === 'error' ? 'Debes aceptar los términos' : undefined}
                                    disabled={isDisabled}
                                />
                                <Checkbox
                                    label="Suscribirse al newsletter"
                                    checked={form.checkbox2}
                                    onChange={set('checkbox2')}
                                    disabled={isDisabled}
                                />
                                <Checkbox
                                    label="Recordar mis preferencias"
                                    checked={form.checkbox3}
                                    onChange={set('checkbox3')}
                                    disabled={isDisabled}
                                />
                            </div>

                            {/* Radio Group */}
                            <Radio
                                label="Postre Favorito"
                                name="postre"
                                options={radioOptions}
                                value={form.radio}
                                onChange={set('radio')}
                                error={errorMsg}
                                disabled={isDisabled}
                            />

                            {/* Switches */}
                            <div className="space-y-3">
                                <p className="text-flansly-muted text-xs font-medium uppercase tracking-wider mb-2">Switches</p>
                                <Switch
                                    label="Notificaciones push"
                                    checked={form.switch1}
                                    onChange={set('switch1')}
                                    disabled={isDisabled}
                                />
                                <Switch
                                    label="Modo oscuro premium"
                                    checked={form.switch2}
                                    onChange={set('switch2')}
                                    disabled={isDisabled}
                                />
                            </div>

                            {/* Slider */}
                            <Slider
                                label="Nivel de dulzura"
                                min={0}
                                max={100}
                                value={form.slider}
                                onChange={set('slider')}
                                unit="%"
                                error={errorMsg}
                                disabled={isDisabled}
                            />
                        </div>
                    </section>

                    {/* ━━ SECCIÓN 5: Cargador de Archivos ━━ */}
                    <section className="bg-flansly-card/50 backdrop-blur-sm rounded-2xl p-6 border border-flansly-surface/30">
                        <h2 className="text-lg text-flansly-flan font(--font-manrope) mb-1 flex items-center gap-2">
                            <Hash size={18} className="text-flansly-caramel" />
                            Cargador de Archivos
                        </h2>
                        <p className="text-flansly-muted text-xs mb-5">file (drag & drop)</p>
                        <FileInput
                            ref={fileRef}
                            label="Subir Imagen del Postre"
                            accept=".jpg,.jpeg,.png,.webp,.gif"
                            multiple
                            onChange={(e) => {
                                const names = Array.from(e.target.files || []).map(f => f.name);
                                setForm(prev => ({ ...prev, file: names.length ? names : null }));
                            }}
                            error={errorMsg}
                            disabled={isDisabled}
                        />
                    </section>

                    {/* ── Reset Button ── */}
                    <div className="flex justify-center pb-8">
                        <Button
                            variant="secondary"
                            onClick={() => setForm(INITIAL_STATE)}
                        >
                            🔄 Resetear Formulario
                        </Button>
                    </div>
                </div>

                {/* ── Console / State Viewer ── */}
                <aside className={`
                    hidden lg:flex flex-col
                    w-80 shrink-0 sticky top-24 self-start
                    bg-flansly-card/80 backdrop-blur-sm rounded-2xl
                    border overflow-hidden
                    transition-all duration-300
                    ${form.color !== '#B45309'
                        ? `border-[${form.color}]/40 shadow-[0_0_20px_${form.color}20]`
                        : 'border-flansly-surface/30'
                    }
                `}
                style={form.color !== '#B45309' ? {
                    borderColor: `${form.color}66`,
                    boxShadow: `0 0 20px ${form.color}20`
                } : {}}
                >
                    <button
                        onClick={() => setConsoleOpen(v => !v)}
                        className="flex items-center justify-between w-full px-4 py-3 border-b border-flansly-surface/30 hover:bg-flansly-surface/20 transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-2">
                            <Terminal size={14} className="text-flansly-caramel" />
                            <span className="text-xs font-mono font-bold text-flansly-flan uppercase tracking-wider">
                                State Viewer
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-flansly-success animate-pulse" />
                            {consoleOpen ? <ChevronUp size={14} className="text-flansly-muted" /> : <ChevronDown size={14} className="text-flansly-muted" />}
                        </div>
                    </button>
                    {consoleOpen && (
                        <div className="p-4 max-h-[calc(100vh-160px)] overflow-y-auto">
                            <pre className="text-[11px] font-mono text-flansly-flan/80 leading-relaxed whitespace-pre-wrap break-all">
                                {JSON.stringify(form, null, 2)}
                            </pre>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
}

export default AppTest;