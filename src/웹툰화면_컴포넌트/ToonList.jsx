import React from 'react'
import MainToonCard from './MainToonCard';

export default function ToonList( { webtoons, slide, slideLength } ) {

    const viewWebtoons = webtoons.slice(slide, slide + slideLength);

  return (
    <div className="relative">
        <MainToonCard webtoons={viewWebtoons} />
    </div>
  )
}
