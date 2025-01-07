import React, { useContext } from 'react';
import { LikedWebtoonContext } from '../메인_웹툰화면/Favorite';
import Title from '../웹툰화면_컴포넌트/Title';

export default function MyPage() {

  const { likedWebtoons } = useContext(LikedWebtoonContext);

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
            <a
              key={webtoon.id}
              href={webtoon.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col pb-2 group"
            >
              <img
                src={webtoon.thumbnail[0]}
                alt={webtoon.title}
                className="h-[300px] w-[240px] object-cover rounded-md group-hover:scale-105"
              />
               <span className='font-bold block overflow-hidden text-ellipsis whitespace-nowrap w-[240px]'>
                {webtoon.title.length > 15 ? webtoon.title.slice(0, 15) + '...' : webtoon.title}
              </span>
            </a>
            
          ))
        ) : (
          <p>좋아요한 웹툰이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
