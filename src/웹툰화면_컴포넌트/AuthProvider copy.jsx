import React, { createContext, useContext, useState, useEffect } from "react";

// Context 생성
const AuthContext = createContext();

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  // 로컬 스토리지에서 초기값으로 authToken을 불러옵니다.
  const initialToken = localStorage.getItem('authToken');
  
  // 상태 관리: 토큰을 관리합니다.
  const [authToken, setAuthToken] = useState(initialToken);

  useEffect(() => {
    // 초기 렌더링 시 authToken이 없으면 로그아웃 상태로 처리
    if (!authToken) {
      setAuthToken(null);
    }
  }, [authToken]);

  // 로그인 함수
  const login = (token) => {
    setAuthToken(token); // authToken 상태 업데이트
    localStorage.setItem('authToken', token); // 로컬 스토리지에 토큰 저장
  };

  // 로그아웃 함수
  const logout = () => {
    setAuthToken(null); // authToken 상태 초기화
    localStorage.removeItem('authToken'); // 로컬 스토리지에서 토큰 제거
  };

  // 로그인 상태는 authToken이 존재하면 true, 없으면 false로 판단
  const isLoggedIn = Boolean(authToken);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth 커스텀 훅
export const useAuth = () => {
  return useContext(AuthContext);
};
