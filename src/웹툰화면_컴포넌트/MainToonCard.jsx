import React from 'react';

export default function MainToonCard({ title, webtoons }) {
    return (
      <div className="w-[1280px] grid grid-cols-5 gap-4">
            <h2 className="col-span-5 text-xl font-bold mb-4">{title}</h2>
            {webtoons.map((webtoon) => (
                <a
                    key={webtoon.id}
                    href={webtoon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pb-5 flex flex-col group"
                >
                    <img
                        src={webtoon.thumbnail[0]}
                        alt='webtoonimg'
                        className="w-full h-[300px] object-cover mb-3 transform transition-transform duration-300 group-hover:scale-105"
                    />
                    <p className="text-lg font-bold mb-2">
                        <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                            {webtoon.title.length > 15 ? webtoon.title.slice(0, 15) + '...' : webtoon.title}
                        </span>
                    </p>
                    <p className="text-sm font-bold">{webtoon.authors.join(" / ")}</p>
                </a>
            ))}
    </div>
    );
}
