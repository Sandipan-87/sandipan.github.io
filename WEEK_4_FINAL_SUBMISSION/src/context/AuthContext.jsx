// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'; 
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [loading, setLoading] = useState(true);

    const loginUser = async (username, password) => {
        const response = await axios.post(`${API_URL}/accounts/api/login/`, {
            username,
            password
        });
        if (response.status === 200) {
            setAuthTokens(response.data);
            localStorage.setItem('authTokens', JSON.stringify(response.data));
        }
    };

    const registerUser = async (formData) => {
        return await axios.post(`${API_URL}/accounts/api/register/`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    };
    
    const logoutUser = useCallback(() => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
    }, []);

    const fetchUser = useCallback(async () => {
        if (authTokens) {
            try {
                const response = await axios.get(`${API_URL}/accounts/api/user/`, {
                    headers: { 'Authorization': `Bearer ${authTokens.access}` }
                });
                setUser(response.data);
            } catch (error) {
                logoutUser();
            }
        }
        setLoading(false);
    }, [authTokens, logoutUser]);
    
    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const contextData = {
        user,
        authTokens,
        loginUser,
        registerUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
