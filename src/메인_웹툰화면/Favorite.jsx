import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const LikedWebtoonContext = createContext();

export default function LikedWebtoonProvider({ children }) {
  const [likedWebtoons, setLikedWebtoons] = useState([]);

  const fetchLikedWebtoons = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      
      const response = await axios.get('http://10.125.121.117:8080/favorites', {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log('Fetching liked webtoons', response.data);
      // const uniqueWebtoons = response.data.filter((value, index, self) =>
      //   self.findIndex((t) => t.id === value.id) === index
      // );
      // console.log('uniqueWebtoons', uniqueWebtoons);
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
      setLikedWebtoons((prev) => [...prev, webtoon]);
    } catch (error) {
      console.error('Failed to add webtoon:', error);
    }
  };

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
    <LikedWebtoonContext.Provider value={{ likedWebtoons, fetchLikedWebtoons, addWebtoon, removeWebtoon }}>
      {children}
    </LikedWebtoonContext.Provider>
  );
}
