import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const LikedWebtoonContext = createContext();

export default function LikedWebtoonProvider({ children }) {

  const [likedWebtoons, setLikedWebtoons] = useState([]);

  useEffect(() => {
    const fetchLikedWebtoons = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        const response = await axios.get('http://10.125.121.117:8080/favorite', {
          headers: { 
                    Authorization: `${token}` 
                   },
        });
        setLikedWebtoons(response.data);
      } catch (error) {
        console.error('Failed to fetch liked webtoons:', error);
      }
    };

    fetchLikedWebtoons();
  }, []);

  const addWebtoon = async (webtoon) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    const userId = token

    const webtoondata = {
      code : webtoon.id,
      name : webtoon.title,
      picture : webtoon.thumbnail[0],
    };

    try {
      await axios.post('http://10.125.121.117:8080/favorite', JSON.stringify(webtoondata), {
        headers: { 
                    Authorization: `${token}`,
                    'Content-Type': 'application/json'
                 },
        
      });
      setLikedWebtoons((prev) => {
        if (!prev.some((liked) => liked.id === webtoon.id)) {
          return [...prev, webtoon];
        }
        return prev;
    });

    const saveWebtoons = JSON.parse(localStorage.getItem(`${userId}_likedWebtoons`)) || [];
      if (!saveWebtoons.some((liked) => liked.id === webtoon.id)) {
        saveWebtoons.push(webtoon);
        localStorage.setItem(`${userId}_likedwebtoons`, JSON.stringify(saveWebtoons));
      }
    } catch (error) {
      console.error('Failed to add webtoon:', error);
    }
  };

  // const getLikedWebtoons = () => {
  //   const token = localStorage.getItem('authToken');
  //   if (!token) return [];
  
  //   // 사용자 고유의 아이디를 토큰에서 추출
  //   const userId = token; // 또는 `jwt` 토큰에서 `userId`를 추출하는 방식 사용
  
  //   // 로컬 스토리지에서 해당 사용자의 웹툰 목록을 가져옵니다
  //   const savedWebtoons = JSON.parse(localStorage.getItem(`${userId}_likedWebtoons`)) || [];
  //   return savedWebtoons;
  // };

  const removeWebtoon = async (id) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      await axios.delete(`http://10.125.121.117:8080/favorite`, {
        headers: { Authorization: `${token}` },
      });
      setLikedWebtoons((prev) => prev.filter((webtoon) => webtoon.id !== id));
    } catch (error) {
      console.error('Failed to remove webtoon:', error);
    }
  };

  return (
    <LikedWebtoonContext.Provider value={{ likedWebtoons, addWebtoon, removeWebtoon }}>
      {children}
    </LikedWebtoonContext.Provider>
  );
}
