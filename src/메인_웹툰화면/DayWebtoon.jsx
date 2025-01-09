import React, { useState, useEffect,useCallback } from 'react';
import { Link } from 'react-router-dom';
import Title from '../웹툰화면_컴포넌트/Title';
import EveryDayToonCard from '../웹툰화면_컴포넌트/EveryDayToonCard';
import axios from 'axios';

export default function Day() {

  const token = localStorage.getItem('authToken');  // 로그인 상태 확인
  const [webtoonData, setWebtoonData] = useState({});
  const [likedWebtoons, setLikedWebtoons] = useState([]);
  const [visibleItems, setVisibleItems] = useState({});
  const apikey = 'https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons?';
  const itemsPerLoad = 5; //5개씩 업로드

  const days = {
    MON: '월요웹툰',
    TUE: '화요웹툰',
    WED: '수요웹툰',
    THU: '목요웹툰',
    FRI: '금요웹툰',
    SAT: '토요웹툰',
    SUN: '일요웹툰',
  };

  const fetchAllWebtoons = async () => {
    try {
      const fetchedData = {};
      for (const [key] of Object.entries(days)) {
        const neresponse = await fetch(`${apikey}provider=NAVER&page=1&perPage=50&isFree=true&updateDay=${key}`);
        const nedata = await neresponse.json();

        const karesponse = await fetch(`${apikey}provider=KAKAO&page=1&perPage=50&isFree=true&updateDay=${key}`);
        const kadata = await karesponse.json();

        const kapageresponse = await fetch(`${apikey}provider=KAKAO_PAGE&page=1&perPage=50&isFree=true&updateDay=${key}`);
        const kapagedata = await kapageresponse.json();
        
        fetchedData[key] = [
          ...(nedata.webtoons || []),
          ...(kadata.webtoons || []),
          ...(kapagedata.webtoons || [])
        ];
      }
      setWebtoonData(fetchedData);

      // 초기 표시 항목 설정 (각 요일별로 5개씩)
      const initialVisibleItems = {};
      Object.keys(fetchedData).forEach((key) => {
        initialVisibleItems[key] = fetchedData[key].slice(0, itemsPerLoad);
      });
      setVisibleItems(initialVisibleItems);
    } catch (error) {
      console.error('웹툰 데이터 로딩 오류:', error);
    }
  };

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      console.log('Load more data');
      loadMoreData();
    }
  }, [visibleItems, webtoonData]);

  const loadMoreData = () => {
    const updatedVisibleItems = { ...visibleItems };
    Object.keys(webtoonData).forEach((key) => {
      if (webtoonData[key].length > visibleItems[key].length) {
        const nextVisible = webtoonData[key].slice(0, visibleItems[key].length + itemsPerLoad);
        updatedVisibleItems[key] = nextVisible;
      }
    });
    setVisibleItems(updatedVisibleItems);
  };

  useEffect(() => {
    fetchAllWebtoons();
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const fetchMy = async () => {
    if (token) {  // 로그인된 경우에만 좋아요 웹툰 가져오기
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
    }
  };

  const handleLike = (webtoon) => {
    const isLiked = likedWebtoons.some((item) => item.code === webtoon.id.trim());
    if (isLiked) {
      setLikedWebtoons(likedWebtoons.filter((item) => item.code !== webtoon.id.trim()));
    } else {
      setLikedWebtoons([...likedWebtoons, { code: webtoon.id.trim(), ...webtoon }]);
    }
  };

  useEffect(() => {
    fetchMy(); // 로그인된 사용자의 좋아요 웹툰을 가져옴
    fetchAllWebtoons(); // 모든 무료 웹툰 데이터를 가져옴
  }, [token]); // token이 변경될 때마다 호출

  return (
    <div className='items-center justify-center w-[1280px] mx-auto'>
      <Title />
      <div className='flex'>
        <Link to='/day/NaverMain' className="mt-10 mr-10 text-2xl font-bold">네이버</Link>
        <Link to='/day/KakaoMain' className="mt-10 mr-10 text-2xl font-bold">카카오</Link>
        <Link to='/day/KakaoPageMain' className="mt-10 text-2xl font-bold">카카오페이지</Link>
      </div>
      <div className='w-[1280px] grid grid-cols-7 mx-auto mt-10 font-bold border-y border-l border-gray-200'>
        {Object.entries(days).map(([key, label]) => (
          <div key={key} className="text-center border-r border-gray-200">
            <span className='flex items-center justify-center h-[45px]'>{label}</span>
            {webtoonData[key] && (
              <ul>
                {webtoonData[key].map((webtoon) => (
                  <li key={webtoon.id}>
                    <EveryDayToonCard webtoons={[webtoon]} likedWebtoonsList={likedWebtoons} handleLike={handleLike} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
