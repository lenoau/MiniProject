import React, { useState, useEffect } from 'react';
import left from '../Image/left.png';
import right from '../Image/right.png';

export default function ToonCard() {
    const [slide, setSlide] = useState(0); // useState로 초기화
    const slideLength = 5;
    const [webtoon, setWebtoon] = useState([]); // 기본값 빈 배열로 설정

    const apikey = 'https://korea-webtoon-api-cc7dda2f0d77.herokuapp.com/webtoons?';
    let url = 'provider=NAVER&page=1&perPage=30&isFree=true&updateDay=SAT';
    const api_url = `${apikey}${url}`;

    const handleNext = () => {
        if (slide + slideLength < webtoon.length) {
            setSlide((prev) => prev + slideLength);
        }
    };

    const handlePrev = () => {
        if (slide - slideLength >= 0) {
            setSlide((prev) => prev - slideLength);
        }
    };

    const viewWebtoons = webtoon.slice(slide, slide + slideLength);

    useEffect(() => {
        const fetchWebtoon = async () => {
            try {
                const response = await fetch(api_url);
                const data = await response.json();

                if (data.webtoons && Array.isArray(data.webtoons)) {
                    setWebtoon(data.webtoons);
                }
            } catch (error) {
                console.error("웹툰 에러:", error);
            }
        };
        fetchWebtoon();
    }, []);

    return (
        <div className="w-[1280px] mx-auto mt-10 flex">
            <div>
                <div className='w-[1280px] mt-10 font-bold text-3xl'>
                    <div>토요웹툰</div>
                    <div className='text-xl mt-5'>
                        <span className='mr-5'>네이버</span>
                        <span className='mr-5'>카카오</span>
                        <span className='mr-5'>카카오페이지</span>
                    </div>
                </div>
                <div className="relative">
                    <div className='w-[1280px] mt-10 grid grid-cols-5 gap-4'>
                        {viewWebtoons.length && viewWebtoons.map((webtoon) => (
                            <div key={webtoon.id} className="pb-5 flex flex-col">
                                <img src={webtoon.thumbnail[0]} alt='webtoonimg' className="w-full h-[300px] object-cover mb-3"/>
                                <p className="text-lg font-bold mb-2">
                                    <span className="block overflow-hidden text-ellipsis whitespace-nowrap">{webtoon.title.length > 15 ? webtoon.title.slice(0, 15) + '...' : webtoon.title}</span>
                                </p>
                                <p className="text-sm font-bold">{webtoon.authors.join(" / ")}</p>
                            </div>
                        ))}
                    </div>
                    <button className="absolute left-[-50px] px-4 py-2 disabled:opacity-50 top-[35%]" 
                        onClick={handlePrev} 
                        disabled={slide === 0}>
                        <img src={left} alt='left'/>
                    </button>
                    <button className="absolute right-[-50px] px-4 py-2 disabled:opacity-50 top-[35%]" 
                        onClick={handleNext} 
                        disabled={slide + slideLength >= webtoon.length}>
                        <img src={right} alt='right'/>
                    </button>
                </div>
            </div>
        </div>
    );
}
