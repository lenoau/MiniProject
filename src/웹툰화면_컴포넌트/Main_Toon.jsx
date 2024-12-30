import React, { useState, useEffect } from 'react';
import SlideButton from './SlideButton';
import ToonList from './ToonList';

export default function ToonCard() {

    const [currentDay, setCurrentDay] = useState(''); //날짜별 웹툰데이터
    const [neSlide, setNeSlide] = useState(0);  // 네이버 슬라이드
    const [kaSlide, setKaSlide] = useState(0);  // 카카오 슬라이드
    const [kapageSlide, setKapageSlide] = useState(0); // 카카오페이지 슬라이드
    const slideLength = 5;
    const [neWebtoons, setNeWebtoons] = useState([]);
    const [kaWebtoons, setKaWebtoons] = useState([]);
    const [kapageWebtoons, setKapageWebtoons] = useState([]);

    const apikey = 'https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons?';

    
    const days = {
        MON: '월요웹툰',
        TUE: '화요웹툰',
        WED: '수요웹툰',
        THU: '목요웹툰',
        FRI: '금요웹툰',
        SAT: '토요웹툰',
        SUN: '일요웹툰',
      };

    // 네이버 웹툰 슬라이드 버튼
    const handleNeNext = () => {
        if (neSlide + slideLength < neWebtoons.length) {
            setNeSlide(prev => prev + slideLength);
        }
    };

    const handleNePrev = () => {
        if (neSlide - slideLength >= 0) {
            setNeSlide(prev => prev - slideLength);
        }
    };

    // 카카오 웹툰 슬라이드 버튼
    const handleKaNext = () => {
        if (kaSlide + slideLength < kaWebtoons.length) {
            setKaSlide(prev => prev + slideLength);
        }
    };

    const handleKaPrev = () => {
        if (kaSlide - slideLength >= 0) {
            setKaSlide(prev => prev - slideLength);
        }
    };

    // 카카오페이지지 웹툰 슬라이드 버튼
    const handleKapageNext = () => {
        if (kapageSlide + slideLength < kapageWebtoons.length) {
            setKapageSlide(prev => prev + slideLength);
        }
    };

    const handleKapagePrev = () => {
        if (kapageSlide - slideLength >= 0) {
            setKapageSlide(prev => prev - slideLength);
        }
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

            const neUrl = `provider=NAVER&page=1&perPage=50&isFree=true&updateDay=${currentDay}`;
            const kaUrl = `provider=KAKAO&page=1&perPage=50&isFree=true&updateDay=${currentDay}`;
            const kapageUrl = `provider=KAKAO_PAGE&page=1&perPage=50&sort=DESC&isFree=true&updateDay=${currentDay}`;

            try {
                const neResponse = await fetch(`${apikey}${neUrl}`);
                const neData = await neResponse.json();
                setNeWebtoons(neData.webtoons);

                const kaResponse = await fetch(`${apikey}${kaUrl}`);
                const kaData = await kaResponse.json();
                setKaWebtoons(kaData.webtoons);

                const kapageResponse = await fetch(`${apikey}${kapageUrl}`);
                const kapageData = await kapageResponse.json();
                setKapageWebtoons(kapageData.webtoons);

            } catch (error) {
                console.error('웹툰 데이터 로딩 오류:', error);
            }
        };
        fetchWebtoons();
    }, [currentDay]);

    return (
        <div className="w-[1280px] mx-auto mt-10 flex">
            <div>
                <div className="w-[1280px] mt-10 font-bold text-3xl">
                <div>{days[currentDay]}</div>
                </div>
                <div className="pt-2 border-b-2 border-gray"></div>
                
                {/* 네이버 웹툰 */}
                <div className="relative">
                    <div className="mt-10 mb-5 text-2xl font-bold">네이버</div>
                    <ToonList webtoons={neWebtoons} slide={neSlide} slideLength={slideLength} />
                    <SlideButton direction="left" onClick={handleNePrev} disabled={neSlide === 0} />
                    <SlideButton direction="right" onClick={handleNeNext} disabled={neSlide + slideLength >= neWebtoons.length} />
                </div>
                
                {/* 카카오 웹툰 */}
                <div className="relative">
                    <div className="mt-10 mb-5 text-2xl font-bold">카카오</div>
                    <ToonList webtoons={kaWebtoons} slide={kaSlide} slideLength={slideLength} />
                    <SlideButton direction="left" onClick={handleKaPrev} disabled={kaSlide === 0} />
                    <SlideButton direction="right" onClick={handleKaNext} disabled={kaSlide + slideLength >= kaWebtoons.length} />
                </div>

                {/* 카카오 페이지 웹툰 */}
                <div className="relative">
                    <div className="mt-10 mb-5 text-2xl font-bold">카카오페이지</div>
                    <ToonList webtoons={kapageWebtoons} slide={kapageSlide} slideLength={slideLength} />
                    <SlideButton direction="left" onClick={handleKapagePrev} disabled={kapageSlide === 0} />
                    <SlideButton direction="right" onClick={handleKapageNext} disabled={kapageSlide + slideLength >= kapageWebtoons.length} />
                </div>

            </div>
        </div>
    );
}
