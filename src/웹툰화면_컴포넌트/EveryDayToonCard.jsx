import React from 'react'

export default function EveryDayToonCard( {webtoons} ) {
  return (
    <div>
        <div className="">
            {webtoons.map((webtoon) => (
                <a
                    key={webtoon.id}
                    href={webtoon.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col pb-5 group"
                >
                    <div className='flex justify-center'>
                        <img    
                            src={webtoon.thumbnail[0]}
                            alt='webtoonimg'
                            className="h-[250px] w-[170px] border rounded-md object-cover mb-3 transform transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <span className="mb-2 text-lg font-bold">
                        <span className="block overflow-hidden text-ellipsis whitespace-nowrap">
                            {webtoon.title.length > 15 ? webtoon.title.slice(0, 15) + '...' : webtoon.title}
                        </span>
                    </span>
                </a>
            ))}
        </div>
    </div>
  )
}
