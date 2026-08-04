
export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('token');

    if (!token){
        window.location.href = '/login';
        throw new Error('No auth token found.')
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    return response;
}