import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyPage from '../게시판/MyPage';
import EveryDayToonCard from './EveryDayToonCard';

export default function FavoriteContainer({ webtoons }) {

  const [likedWebtoons, setLikedWebtoons] = useState([]);
  console.log('FavoriteContainer in')
  useEffect(() => {
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
    <div>
        <MyPage likedWebtoons={likedWebtoons} />
            <EveryDayToonCard 
                webtoons={webtoons}
                likedWebtoons={likedWebtoons}
                addWebtoon={addWebtoon}
                removeWebtoon={removeWebtoon}
            />
    </div>
  );
}
