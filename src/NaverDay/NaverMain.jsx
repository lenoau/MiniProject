import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Title from '../웹툰화면_컴포넌트/Title'
import WebToonLink from '../웹툰화면_컴포넌트/WebToonLink';
import MainToonCard from '../웹툰화면_컴포넌트/MainToonCard';

export default function Main() {

  const [currentDay, setCurrentDay] = useState('');
  const [Webtoons, setWebtoons] = useState([]); 
  const apikey = 'https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons?';

  const days = {
    MON: '전체 월요웹툰',
    TUE: '전체 화요웹툰',
    WED: '전체 수요웹툰',
    THU: '전체 목요웹툰',
    FRI: '전체 금요웹툰',
    SAT: '전체 토요웹툰',
    SUN: '전체 일요웹툰',
  };

  useEffect(() => {
          const calculateDay = () => {
              const koreanTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' });
              const dayIndex = new Date(koreanTime).getDay();
              const dayMap = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
              setCurrentDay(dayMap[dayIndex]);
          };
          calculateDay();
      },[]);

  useEffect(() => {
      const fetchWebtoons = async () => {
          if (!currentDay) return

          const Url = `provider=NAVER&page=1&perPage=100&isFree=true&updateDay=${currentDay}`;
          const Url2 = `provider=NAVER&page=2&perPage=100&isFree=true&updateDay=${currentDay}`;

          try {
              const Response = await fetch(`${apikey}${Url}`);
              const Response2 = await fetch(`${apikey}${Url2}`);
              const Data = await Response.json();
              const Data2 = await Response2.json();

              const combinedData = [
                ...(Data.webtoons || []),
                ...(Data2.webtoons || [])
              ]

              setWebtoons(combinedData);
          } catch (error) {
              console.error('웹툰 데이터 로딩 오류:', error);
          }
      };
      fetchWebtoons();
  }, [currentDay]);

  const handleDayClick = (day) => {
    setCurrentDay(day);
  };

  return (
    <div className='items-center justify-center w-[1280px] mx-auto'>
      <Title />
      <WebToonLink />
      <div className='font-bold w-[1280px] mx-auto mb-10 mt-5'>
          <Link to='/day/NaverMain/MON' className='mr-5'>월요웹툰</Link>
          <Link to='#' onClick={() =>handleDayClick('TUE')} className='mr-5'>화요웹툰</Link>
          <Link to='#' onClick={() =>handleDayClick('WED')} className='mr-5'>수요웹툰</Link>
          <Link to='#' onClick={() =>handleDayClick('THU')} className='mr-5'>목요웹툰</Link>
          <Link to='#' onClick={() =>handleDayClick('FRI')} className='mr-5'>금요웹툰</Link>
          <Link to='#' onClick={() =>handleDayClick('SAT')} className='mr-5'>토요웹툰</Link>
          <Link to='#' onClick={() =>handleDayClick('SUN')} className='mr-5'>일요웹툰</Link>
      </div>
      <div className='pt-2 border-b-2'></div>
      <div className='mt-2 mb-5 text-xl font-bold'>
        {days[currentDay]}
      </div>
      <MainToonCard webtoons={Webtoons}/>
    </div>
  )
}
