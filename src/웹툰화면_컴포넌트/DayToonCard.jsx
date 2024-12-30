import React from 'react'

export default function DayToonCard( {webtoons}) {
  return (
    <div>
        <div className="w-[1280px] grid grid-cols-7 gap-4">
            {webtoons.map((webtoon) => (
                <a
                    key={webtoon.id}
                    href={webtoon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col pb-5 group"
                >
                    <img
                        src={webtoon.thumbnail[0]}
                        alt='webtoonimg'
                        className="w-full h-[300px] border rounded-md object-cover mb-3 transform transition-transform duration-300 group-hover:scale-105"
                    />
                    <p className="mb-2 text-lg font-bold">
                        <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                            {webtoon.title.length > 15 ? webtoon.title.slice(0, 15) + '...' : webtoon.title}
                        </span>
                    </p>
                    <p className="overflow-hidden text-sm font-bold text-ellipsis whitespace-nowrap">{webtoon.authors.join(" / ")}</p>
                </a>
            ))}
        </div>
    </div>
  )
}
