export const resolveImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
        return url;
    }
    if (url === '/flansly_logo.png') {
        return url;
    }
    
    // Obtener la URL base y limpiarle el /api si lo tiene
    const apiEnv = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const baseUrl = apiEnv.replace(/\/api\/?$/, ''); 
    
    // Asegurar que no hayan dobles barras al concatenar
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    
    return `${cleanBase}${cleanUrl}`;
};
