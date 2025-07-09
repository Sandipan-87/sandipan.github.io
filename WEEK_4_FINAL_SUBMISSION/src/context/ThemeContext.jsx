// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';


const ThemeContext = createContext();


export const useTheme = () => {
    return useContext(ThemeContext);
};


export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  
    useEffect(() => {
        
        document.body.className = theme;
        
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Function to toggle the theme
    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const value = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};
