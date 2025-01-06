import React, { useContext } from 'react';
import { LikedWebtoonContext } from '../메인_웹툰화면/Favorite';

export default function EveryDayToonCard({ webtoons }) {
  const { likedWebtoons, addWebtoon, removeWebtoon } = useContext(LikedWebtoonContext);

  const handleLike = (webtoon) => {
    const isLiked = likedWebtoons.some((liked) => liked.id === webtoon.id);
    if (isLiked) {
      removeWebtoon(webtoon.id);
    } else {
      addWebtoon(webtoon);
    }
  };

  return (
    <div>
      {webtoons.map((webtoon) => (
        <div key={webtoon.id} className="flex flex-col pb-2 group items-center">
          <a href={webtoon.url} target="_blank" rel="noopener noreferrer">
            <img
              src={webtoon.thumbnail[0]}
              alt={webtoon.title}
              className="h-[250px] w-[170px] border rounded-md object-cover mb-2 transform transition-transform duration-300 group-hover:scale-105"
            />
          </a>
          <div className='flex justify-between w-full mb-2'>
            <span className='block overflow-hidden text-ellipsis whitespace-nowrap ml-2'>
              {webtoon.title.length > 15 ? webtoon.title.slice(0, 15) + '...' : webtoon.title}
            </span>
            <button className='mr-2' onClick={() => handleLike(webtoon)}>
              {likedWebtoons.some((liked) => liked.id === webtoon.id) ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
