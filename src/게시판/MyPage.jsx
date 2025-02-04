import React, { useContext, useEffect } from 'react';
import { LikedWebtoonContext } from '../메인_웹툰화면/Favorite';
import Title from '../웹툰화면_컴포넌트/Title';

export default function MyPage() {
  
  const { likedWebtoons, fetchLikedWebtoons } = useContext(LikedWebtoonContext);
  
  useEffect(() => {
    console.log('My Page in')
    fetchLikedWebtoons();
  }, [fetchLikedWebtoons]);

  return (
    <div>
      <Title />
      <div className="w-[1280px] grid grid-cols-5 gap-4 mx-auto font-bold text-2xl mt-10">
        관심 웹툰
      </div>
      <div className="w-[1280px] pt-2 border-b-2 border-gray mx-auto mb-10"></div>
      <div className="w-[1280px] grid grid-cols-5 gap-4 mx-auto">
        {likedWebtoons.length > 0 ? (
          likedWebtoons.map((webtoon) => (
            <div>
            <a
              key={webtoon.id}
              href={webtoon.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col pb-2 group"
            >
              <img
                src={webtoon.picture}
                alt={webtoon.name}
                className="h-[300px] w-[240px] object-cover rounded-md group-hover:scale-105"
              />
              </a>
              <span className='font-bold block overflow-hidden text-ellipsis whitespace-nowrap w-[240px]'>
                {webtoon.name ? webtoon.name.length > 15 ? webtoon.name.slice(0, 15) + '...' : webtoon.name : ""}
              </span>
            </div>
          ))
        ) : (
          <p>좋아요한 웹툰이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
