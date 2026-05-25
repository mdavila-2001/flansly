# 🤖 Prompt de Arquitectura: Maquetación Premium de Login y Registro

## 🎯 Rol y Contexto
Actúa como un Desarrollador Frontend Senior experto en React, Tailwind CSS v4 y Clean Architecture.
Actualmente tenemos los archivos `src/presentation/pages/Login.jsx` y `src/presentation/pages/Register.jsx` como cascarones básicos. Necesitamos elevar su diseño a un nivel premium, basándonos en una maqueta visual específica de pantalla dividida (Split-Screen) con estilo "Glassmorphism" y modo oscuro.

## 📝 Tarea Principal
Refactorizar `Login.jsx` y `Register.jsx` utilizando los componentes atómicos de nuestra UI (`Input`, `Button`, `FileInput`) y conectándolos estructuralmente para que encajen en nuestro `AuthLayout`.

## 🎨 Especificaciones de Diseño y Layout
Ambas pantallas deben compartir esta estructura base:
- **Layout General:** Utilizar un contenedor de grilla `grid lg:grid-cols-2 min-h-screen`.
- **Panel Izquierdo (Imagen):** Debe ocultarse en móviles (`hidden lg:block`). Debe contener una imagen a pantalla completa con `object-cover` y un gradiente superpuesto (`bg-gradient-to-r from-transparent to-black/80`). 
- **Panel Derecho (Formulario):** Un contenedor centrado. El formulario debe estar envuelto en una tarjeta "Glassmorphism" con las siguientes clases de Tailwind v4: `bg-flansly-card/80 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 shadow-2xl border border-flansly-surface/50`.
- **Selector de Rol (Solo en Registro):** Un toggle visual tipo "Píldora" (Tab) para alternar el estado de React entre `creator` y `follower`.
- **Ambient Glow:** Añadir un `div` absoluto detrás del contenedor del formulario con un brillo radial sutil color caramelo.

## ⚙️ Requerimientos Técnicos por Pantalla

### 1. `Login.jsx`
- **Campos:** `email` y `password`.
- **Acción:** Usar el `<Button variant="primary">` con el texto "Entrar al Horno" y un ícono de flecha (`ArrowRight` de `lucide-react`).
- **Estado:** Controlar las entradas con estado local de React y simular la llamada de carga.

### 2. `Register.jsx`
- **Selector de Rol:** Definir el estado `role` ('creator' o 'follower').
- **Campos Base:** `username`, `email`, `password`, `displayName`.
- **Campos Condicionales (Avatar y Banner):** Si el `role === 'creator'`, renderizar dos componentes `<FileInput />`.
  - Uno para la Foto de Perfil (`accept="image/*"`).
  - Uno para la Foto de Portada (Banner).
- **Diseño del Formulario:** Para que el registro no quede excesivamente largo, agrupa los campos `username` y `displayName` en dos columnas (`grid grid-cols-2 gap-4`).
- **Acción:** Usar `<Button variant="primary">` con el texto "Comenzar a Hornear".

## 🧩 Uso de Componentes Atómicos
Está ESTRICTAMENTE PROHIBIDO usar etiquetas `<input>` o `<button>` nativas. Debes importar y utilizar:
- `import { Input } from '../components/ui/Input';`
- `import { Button } from '../components/ui/Button';`
- `import { FileInput } from '../components/ui/FileInput';`

## 🔗 Estilos del Tema (Tailwind v4)
No inventes colores hexadecimales. Utiliza nuestras variables CSS ya definidas:
- Textos: `text-[#F9F9F9]` (títulos) y `text-flansly-muted` (descripciones).
- Acentos: `text-flansly-flan` (amarillo flan) para highlights.
- Botones Primarios: Ya vienen estilizados con el color Caramelo en el componente `<Button>`.

## 📜 Salida Esperada
Genera el código completo y listo para copiar/pegar de los archivos:
1. `src/presentation/pages/Login.jsx`
2. `src/presentation/pages/Register.jsx`
Asegúrate de incluir las importaciones de `lucide-react` necesarias (ej. `Mail`, `Lock`, `User`).

## Plantilla para el login 
```
<!DOCTYPE html>

<html class="dark" lang="es"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Flansly - Entrar al Horno</title>
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=JetBrains+Mono:wght@500&amp;family=Manrope:wght@700;800&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS (v3 via CDN as required by environment, simulating requested modern features) -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Tailwind Configuration -->
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary-fixed-dim": "#dcc66e",
                        "on-surface": "#e5e2e1",
                        "on-secondary-fixed": "#331200",
                        "surface-variant": "#353534",
                        "inverse-primary": "#6e5e0d",
                        "inverse-surface": "#e5e2e1",
                        "text-medium-emphasis": "#A0A0A0",
                        "primary": "#ffffff",
                        "secondary-fixed": "#ffdbca",
                        "surface-container-lowest": "#0e0e0e",
                        "on-tertiary": "#00363c",
                        "on-secondary-container": "#ffe2d5",
                        "on-tertiary-fixed-variant": "#004f57",
                        "secondary": "#ffb68e",
                        "error-container": "#93000a",
                        "text-high-emphasis": "#F9F9F9",
                        "tertiary": "#ffffff",
                        "on-primary": "#3a3000",
                        "on-error": "#690005",
                        "surface-tint": "#dcc66e",
                        "outline": "#97907f",
                        "surface-container-highest": "#353534",
                        "on-secondary-fixed-variant": "#763300",
                        "surface": "#131313",
                        "tertiary-container": "#9feffb",
                        "surface-bright": "#393939",
                        "secondary-container": "#ab4c00",
                        "primary-fixed": "#f9e287",
                        "on-primary-fixed-variant": "#534600",
                        "surface-card": "#1E1E1E",
                        "surface-container": "#201f1f",
                        "on-surface-variant": "#cdc6b3",
                        "on-error-container": "#ffdad6",
                        "on-background": "#e5e2e1",
                        "on-primary-fixed": "#221b00",
                        "tertiary-fixed": "#9feffb",
                        "background": "#131313",
                        "tertiary-fixed-dim": "#83d3df",
                        "surface-container-low": "#1c1b1b",
                        "on-secondary": "#532200",
                        "outline-variant": "#4b4738",
                        "on-tertiary-fixed": "#001f23",
                        "secondary-fixed-dim": "#ffb68e",
                        "inverse-on-surface": "#313030",
                        "surface-dim": "#131313",
                        "error": "#ffb4ab",
                        "border-subtle": "#2A2A2A",
                        "on-tertiary-container": "#096f7a",
                        "primary-container": "#f9e287",
                        "on-primary-container": "#746414",
                        "surface-container-high": "#2a2a2a"
                    },
                    borderRadius: {
                        "DEFAULT": "0.25rem",
                        "lg": "0.5rem",
                        "xl": "0.75rem",
                        "full": "9999px"
                    },
                    spacing: {
                        "base-unit": "8px",
                        "gutter": "24px",
                        "margin-mobile": "16px",
                        "container-max-width": "1200px",
                        "margin-desktop": "40px"
                    },
                    fontFamily: {
                        "headline-xl": ["Manrope", "sans-serif"],
                        "body-md": ["Inter", "sans-serif"],
                        "headline-lg": ["Manrope", "sans-serif"],
                        "headline-lg-mobile": ["Manrope", "sans-serif"],
                        "label-caps": ["JetBrains Mono", "monospace"],
                        "body-sm": ["Inter", "sans-serif"]
                    },
                    fontSize: {
                        "headline-xl": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "800" }],
                        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                        "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
                        "headline-lg-mobile": ["28px", { "lineHeight": "36px", "fontWeight": "700" }],
                        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "500" }],
                        "body-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }]
                    }
                }
            }
        }
    </script>
<style>
        /* Ambient Background Glow */
        .ambient-glow {
            position: absolute;
            width: 60vw;
            height: 60vh;
            background: radial-gradient(circle, rgba(180,83,9,0.05) 0%, rgba(18,18,18,0) 70%);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 0;
            pointer-events: none;
        }
        
        /* Custom Input Autofill styling to maintain dark mode aesthetic */
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px #2A2A2A inset !important;
            -webkit-text-fill-color: #e5e2e1 !important;
            transition: background-color 5000s ease-in-out 0s;
        }
    </style>
</head>
<body class="bg-surface text-on-surface antialiased min-h-screen relative overflow-hidden grid lg:grid-cols-2"><!-- Image Side -->
<div class="hidden lg:block relative h-screen overflow-hidden">
<img alt="Gourmet flan dessert" class="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFaO_av0KlNt0md7Nz3DHIJsC_muJdPtsUHo1_JSL6ueFrJ59RjgrVqheK0NrMpJKV2NUFjko_BH2d4NnithLldshlbEcCOAEfd--NN9QWfecb67P3ita3jFVVgUB8cm9FJjI2nQT3a1q0BPx0RSbpWy7OJnpcVEOPwz-2rtqmaT2l7sCoRT2ucnB9mKayahZg9Iy3guv0n4w0oqtx3Sibm_GTIWJKufWhY0uajQB0CdC63Kfy3EupO3mhLLbLAeuMvS-BLy0-uv8"/>
<div class="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
</div>
<!-- Form Side -->
<div class="flex flex-col items-center justify-center min-h-screen bg-[#000000] p-margin-mobile relative z-10">
<main class="w-full max-w-[480px] px-margin-mobile">
<div class="bg-surface-card rounded-[2rem] p-8 md:p-10 shadow-2xl border border-border-subtle backdrop-blur-xl">
<!-- Brand Anchor -->
<div class="text-center mb-10">
<h1 class="font-headline-xl text-headline-xl text-primary-fixed-dim tracking-tight">Flansly</h1>
<p class="font-body-sm text-body-sm text-on-surface-variant mt-2 opacity-80">El postre de los creadores.</p>
</div>
<!-- Role Toggle (Tabs) -->
<div class="flex p-1 bg-surface-container-high rounded-full mb-8 relative">
<div class="absolute top-1 left-1 w-[calc(50%-4px)] h-[calc(100%-8px)] bg-surface-card rounded-full shadow-sm transition-transform duration-300 ease-in-out border border-border-subtle" id="tab-indicator"></div>
<button class="flex-1 relative z-10 py-3 text-center font-label-caps text-label-caps text-primary-fixed-dim transition-colors duration-300 focus:outline-none" id="tab-creator" onclick="switchTab(0)">SOY CREADOR</button>
<button class="flex-1 relative z-10 py-3 text-center font-label-caps text-label-caps text-on-surface-variant transition-colors duration-300 focus:outline-none" id="tab-follower" onclick="switchTab(1)">SOY SEGUIDOR</button>
</div>
<!-- Login Form -->
<form class="space-y-6" onsubmit="event.preventDefault();">
<div class="space-y-2">
<label class="font-body-sm text-body-sm text-on-surface-variant block" for="email">Correo Electrónico</label>
<div class="relative group">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-60 group-focus-within:text-primary-fixed-dim transition-colors">mail</span>
<input class="w-full bg-surface-container-high border border-border-subtle rounded-xl pl-12 pr-4 py-4 font-body-md text-body-md text-on-surface placeholder:text-text-medium-emphasis placeholder:opacity-50 focus:outline-none focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim transition-all duration-200" id="email" placeholder="creador@ejemplo.com" type="email"/>
</div>
</div>
<div class="space-y-2">
<div class="flex justify-between items-center">
<label class="font-body-sm text-body-sm text-on-surface-variant block" for="password">Contraseña</label>
<a class="font-body-sm text-body-sm text-on-surface-variant hover:text-primary-fixed-dim transition-colors duration-200" href="#">¿Olvidaste tu contraseña?</a>
</div>
<div class="relative group">
<span class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-60 group-focus-within:text-primary-fixed-dim transition-colors">lock</span>
<input class="w-full bg-surface-container-high border border-border-subtle rounded-xl pl-12 pr-12 py-4 font-body-md text-body-md text-on-surface placeholder:text-text-medium-emphasis placeholder:opacity-50 focus:outline-none focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim transition-all duration-200" id="password" placeholder="••••••••" type="password"/>
<button class="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none" type="button">
<span class="material-symbols-outlined text-[20px]">visibility_off</span>
</button>
</div>
</div>
<button class="w-full mt-8 bg-secondary-container text-on-secondary-container font-body-md text-body-md font-bold py-4 rounded-xl hover:bg-opacity-90 active:scale-[0.98] transition-all duration-200 flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(171,76,0,0.3)] hover:shadow-[0_0_25px_rgba(171,76,0,0.5)]" type="submit">
<span>Entrar al Horno</span>
<span class="material-symbols-outlined text-[20px]">arrow_forward</span>
</button>
</form>
<!-- Card Footer -->
<div class="mt-8 text-center border-t border-border-subtle pt-6">
<p class="font-body-sm text-body-sm text-on-surface-variant">
                    ¿No tienes cuenta? 
                    <a class="text-primary-fixed-dim font-medium hover:underline hover:text-primary-fixed transition-colors" href="#">Regístrate aquí</a>
</p>
</div>
</div>
</main>
</div>
<script>
    function switchTab(index) {
        const indicator = document.getElementById('tab-indicator');
        const tabCreator = document.getElementById('tab-creator');
        const tabFollower = document.getElementById('tab-follower');

        if (index === 0) {
            indicator.style.transform = 'translateX(0)';
            tabCreator.classList.replace('text-on-surface-variant', 'text-primary-fixed-dim');
            tabFollower.classList.replace('text-primary-fixed-dim', 'text-on-surface-variant');
        } else {
            indicator.style.transform = 'translateX(100%)';
            tabFollower.classList.replace('text-on-surface-variant', 'text-primary-fixed-dim');
            tabCreator.classList.replace('text-primary-fixed-dim', 'text-on-surface-variant');
        }
    }
</script></body></html>
```