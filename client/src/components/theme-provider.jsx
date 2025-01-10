import React, { createContext, useContext, useEffect, useState } from "react";

// Default values for the theme context
const initialState = {
    theme: "system",
    setTheme: () => null,
};

const ThemeProviderContext = createContext(initialState);

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme" }) {
    const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) || defaultTheme);

    useEffect(() => {
        const root = window.document.documentElement;

        // Remove existing theme classes
        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light";

            root.classList.add(systemTheme);
            return;
        }

        // Add the selected theme class
        root.classList.add(theme);
    }, [theme]);

    const value = {
        theme,
        setTheme: (newTheme) => {
            localStorage.setItem(storageKey, newTheme);
            setTheme(newTheme);
        },
    };

    return (
        <ThemeProviderContext.Provider value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
};

const themes = {
    themeRed: "themeRed", 
    themeBlue: "themeBlue", 
    themeGreen: "themeGreen",
    themeViolet: "themeViolet",
    themeYellow: "themeYellow"
};

const moodThemeContext = createContext({
    theme: themes.themeRed,
    setTheme: () => { },
});

export const MoodThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(themes.themeRed);

    useEffect(() => {
        const root = document.documentElement;

        // Remove all theme classes
        root.classList.remove(themes.themeBlue, themes.themeGreen, themes.themeRed,
            themes.themeYellow, themes.themeViolet
        );

        // Add the current theme class
        root.classList.add(theme);
    }, [theme]);

    return (
        <moodThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </moodThemeContext.Provider>
    );
};

// Hook to use the theme context
export const useMoodTheme = () => useContext(moodThemeContext);
