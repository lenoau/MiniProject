import React, {useContext} from 'react';
import { LikedWebtoonContext } from '../메인_웹툰화면/Favorite';

export default function EveryDayToonCard({ webtoons , likedWebtoonsList, handleLike}) {
  const { addWebtoon, removeWebtoon } = useContext(LikedWebtoonContext);
  const codes = [...new Set(likedWebtoonsList.map(item => item.code))]
  
  const webtoon = webtoons[0];
  const isLiked = codes.includes(webtoon.id.trim()); // true or false
  
  // console.log('likedWebtoons', webtoon.id.trim(), isLiked, codes);

  const handleLike2 = (webtoon) => {
    if (isLiked) {
      removeWebtoon(webtoon.id);
    } else {
      addWebtoon(webtoon);
    }
  };

  const combinedHandleLike = (webtoon) => {
    // handleLike 호출
    if (handleLike) {
      handleLike(webtoon);
    }
    // handleLike2 호출
    handleLike2(webtoon);
  };

  return (
    <div>
      {
      // webtoons.map((webtoon) => (
        <div key={webtoon.id} className="flex flex-col items-center pb-2 group">
          <a href={webtoon.url} target="_blank" rel="noopener noreferrer">
            <img
              src={webtoon.thumbnail[0]}
              alt={webtoon.title}
              className="h-[250px] w-[170px] border rounded-md object-cover mb-2 transform transition-transform duration-300 group-hover:scale-105"
            />
          </a>
          <div className='flex justify-between w-full mb-2'>
            <span className='block ml-2 overflow-hidden text-ellipsis whitespace-nowrap'>
              {webtoon.title.length > 15 ? webtoon.title.slice(0, 15) + '...' : webtoon.title}
            </span>
            <button className='mr-2' onClick={() => combinedHandleLike(webtoon)}>
              {isLiked ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
      // ))
      }
    </div>
  );
}