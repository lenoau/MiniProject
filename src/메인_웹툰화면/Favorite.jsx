import React, { createContext, useState, useEffect } from 'react';

// Context 생성
export const LikedWebtoonContext = createContext();

export function Favorite({ children }) {
  const [likedWebtoons, setLikedWebtoons] = useState([]);

  useEffect(() => {
    const savedWebtoons = JSON.parse(localStorage.getItem('likedWebtoons')) || [];
    setLikedWebtoons(savedWebtoons);
  }, []);

  const addWebtoon = (webtoon) => {
    const updatedLikes = [...likedWebtoons, webtoon];
    setLikedWebtoons(updatedLikes);
    localStorage.setItem('likedWebtoons', JSON.stringify(updatedLikes));
  };

  const removeWebtoon = (id) => {
    const updatedLikes = likedWebtoons.filter((webtoon) => webtoon.id !== id);
    setLikedWebtoons(updatedLikes);
    localStorage.setItem('likedWebtoons', JSON.stringify(updatedLikes));
  };

  return (
    <LikedWebtoonContext.Provider value={{ likedWebtoons, addWebtoon, removeWebtoon }}>
      {children}
    </LikedWebtoonContext.Provider>
  );
}
