import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    isGuest: boolean;
    setIsGuest: (val: boolean) => void;
    }

    const AuthContext = createContext<AuthContextType>({
    isGuest: false,
    setIsGuest: () => {},
    });

    export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isGuest, setIsGuest] = useState(false);
    return (
        <AuthContext.Provider value={{ isGuest, setIsGuest }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);