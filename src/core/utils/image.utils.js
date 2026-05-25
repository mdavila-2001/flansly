/**
 * Resuelve la URL de una imagen integrando dinámicamente la dirección del backend.
 * @param {string} url - Ruta relativa o absoluta de la imagen.
 * @returns {string} URL resuelta y lista para usar en etiquetas img.
 */
export const resolveImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
        return url;
    }
    if (url === '/flansly_logo.png') {
        return url;
    }
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    return `${baseUrl}${url}`;
};
