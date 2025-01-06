import React, { useState } from 'react';
import like from '../Image/좋아요.png';

export default function EveryDayToonCard({ webtoons }) {
  // 좋아요 상태를 관리하는 useState
  const [likedWebtoons, setLikedWebtoons] = useState(
    JSON.parse(localStorage.getItem('likedWebtoons')) || [] // localStorage에서 이전에 좋아요한 웹툰 목록 불러오기
  );

  // 좋아요 클릭 핸들러
  const handleLike = (webtoon) => {
    const isLiked = likedWebtoons.some((liked) => liked.id === webtoon.id); // 이미 좋아요한 웹툰인지 확인

    if (isLiked) {
      // 이미 좋아요한 웹툰이라면 목록에서 제거
      const updatedWebtoons = likedWebtoons.filter((liked) => liked.id !== webtoon.id);
      setLikedWebtoons(updatedWebtoons);
      localStorage.setItem('likedWebtoons', JSON.stringify(updatedWebtoons));
    } else {
      // 좋아요하지 않았다면 목록에 추가
      const updatedWebtoons = [...likedWebtoons, webtoon];
      setLikedWebtoons(updatedWebtoons);
      localStorage.setItem('likedWebtoons', JSON.stringify(updatedWebtoons));
    }
  };

  return (
    <div>
      <div>
        {webtoons.map((webtoon) => (
          <a
            key={webtoon.id}
            href={webtoon.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col pb-2 group"
          >
            <div className="flex justify-center">
              <img
                src={webtoon.thumbnail[0]}
                alt="webtoonimg"
                className="h-[250px] w-[170px] border rounded-md object-cover mb-3 transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className="text-lg font-bold">
              <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                {webtoon.title.length > 15 ? webtoon.title.slice(0, 15) + '...' : webtoon.title}
              </span>
            </span>
          </a>
        ))}

        {/* 좋아요 버튼 */}
        <div className="flex justify-end">
          <button className="" onClick={() => handleLike(webtoons)}>
            <span className="w-[20px] h-[20px] ml-auto mr-3 mb-3">
              {likedWebtoons.some((liked) => liked.id === webtoons.id) ? '🤍' : '❤️'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
