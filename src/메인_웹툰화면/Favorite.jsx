import React, { createContext, useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import axios from 'axios';

export const LikedWebtoonContext = createContext();

export default function LikedWebtoonProvider({ children }) {

  const [likedWebtoons, setLikedWebtoons] = useState([]);
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search); // 쿼리 파라미터 가져오기
  // const user_Id = queryParams.get('user_id'); // 'id' 파라미터 값 가져오기

  useEffect(() => {
    // if (!user_Id) return;
    
    const fetchLikedWebtoons = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) return;

      try {
        
        const response = await axios.get(`http://10.125.121.117:8080/favorites`, {
          headers: { 
                      Authorization: `${token}` 
                   },
        });

        const uniqueWebtoons = response.data.filter((value, index, self) => {
          return index === self.findIndex((t) => (t.id === value.id));
        });
        setLikedWebtoons(uniqueWebtoons);

        console.log('Fetched liked webtoons:', response.data);
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

    const webtoondata = {
      code : webtoon.id,
      name : webtoon.title,
      picture : webtoon.thumbnail[0],
    };

    try {
      await axios.post('http://10.125.121.117:8080/favorite', webtoondata, {
        headers: { 
                    Authorization: `${token}`,
                    'Content-Type': 'application/json'
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
    <LikedWebtoonContext.Provider value={{ likedWebtoons, addWebtoon, removeWebtoon }}>
      {children}
    </LikedWebtoonContext.Provider>
  );
}
