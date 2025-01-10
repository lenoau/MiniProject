import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';
// import { useLocation } from 'react-router-dom';

export const LikedWebtoonContext = createContext();

export default function Favorite({ children }) {
  const [likedWebtoons, setLikedWebtoons] = useState([]);

  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search); // 쿼리 파라미터 가져오기
  // const userId = queryParams.get('id');

  const getUserIdFromToken = () => {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
  
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // JWT의 페이로드 디코드
      return payload.userId; // JWT 페이로드에서 userId 추출
    } catch (error) {
      console.error('Failed to parse token:', error);
      return null;
    }
  };

  const fetchLikedWebtoons = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      const response = await axios.get('http://10.125.121.117:8080/favorites', {
        headers: {
          Authorization: `${token}`,
        },
      });

      setLikedWebtoons(response.data);
    } catch (error) {
      console.error('Failed to fetch liked webtoons:', error);
    }
  }, []); // 빈 배열을 의존성으로 사용하여 참조 고정

  const addWebtoon = async (webtoon) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    const webtoondata = {
      code: webtoon.id,
      name: webtoon.title,
      picture: webtoon.thumbnail[0],
    };

    try {
      await axios.post('http://10.125.121.117:8080/favorite', webtoondata, {
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json',
        },
      });
      setLikedWebtoons((prev) => {
        if (!prev.some((liked) => liked.id === webtoon.id)) {
          return [...prev, webtoon];
        }
        return prev;
      });
    } catch (error) {
      console.error('Failed to add webtoon:', error);
    }
  };

  const removeWebtoon = async (code) => {
    const token = localStorage.getItem('authToken');
    const userId = getUserIdFromToken(); // JWT에서 userId 추출


    const webtoondata = {
      code : code,
      userId : userId
    };

    console.log('code : ', code);
    // console.log('userId : ', userId);
    // const token = localStorage.getItem('authToken');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('JWT Payload:', payload);
    }

    try {
      await axios.delete(`http://10.125.121.117:8080/favorites`, {
        headers: {
          Authorization: `${token}` ,
          'Content-Type': 'application/json',
        },
        data: webtoondata
      });
      setLikedWebtoons((prev) => prev.filter((webtoon) => webtoon.id !== code));
    } catch (error) {
      console.error('Failed to remove webtoon:', error);
    }
  };

  return (
    <LikedWebtoonContext.Provider value={{ likedWebtoons, fetchLikedWebtoons, addWebtoon, removeWebtoon }}>
      {children}
    </LikedWebtoonContext.Provider>
  );
}
