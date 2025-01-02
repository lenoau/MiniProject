import React, { createContext, useContext, useState} from "react";

const AuthContext = createContext();

export const AuthProvider = ( {children} ) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        setIsLoggedIn(true);
      };
      
    const logout = () => {
        localStorage.removeItem('authToken'); // 토큰 제거
        setIsLoggedIn(false); // 전역 상태 초기화
      };

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};