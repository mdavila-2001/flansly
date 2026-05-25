export const resolveImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
        return url;
    }
    if (url === '/flansly_logo.png') {
        return url;
    }
    
    const apiEnv = import.meta.env.VITE_API_URL;
    const baseUrl = apiEnv.replace(/\/api\/?$/, ''); 

    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    
    return `${cleanBase}${cleanUrl}`;
};
