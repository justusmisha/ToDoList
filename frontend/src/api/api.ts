const API_BASE_URL = 'http://localhost:5000';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

type Headers = {
    'Content-Type': string;
    Authorization?: string;
};

export const api = {
    get: async (endpoint: string) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    post: async (endpoint: string, data: any) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            } as Headers,
            body: JSON.stringify(data),
        });
        
        const responseData = await response.json();
        
        if (!response.ok && !responseData) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return responseData;
    },

    put: async (endpoint: string, data: any) => {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeader(),
            } as Headers,
            body: JSON.stringify(data),
        });
        
        const responseData = await response.json();
        
        if (!response.ok) {
            throw new Error(responseData.error || 'Update failed');
        }
        
        return responseData;
    },

    login: async (username: string, password: string) => {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }
        
        if (data.access_token) {
            localStorage.setItem('token', data.access_token);
        }
        
        return data;
    },
};
