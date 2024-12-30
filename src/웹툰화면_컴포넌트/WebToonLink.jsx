import React from 'react'
import { Link } from 'react-router-dom'

export default function WebToonLink() {
  return (
    <div className='items-center justify-center w-[1280px] mx-auto'>
        <div className='flex'>
            <Link to='/day/NaverMain' className="mt-10 mr-10 text-2xl font-bold">네이버</Link>
            <Link to='/day/KakaoMain' className="mt-10 mr-10 text-2xl font-bold">카카오</Link>
            <Link to='/day/KakaoPageMain' className="mt-10 text-2xl font-bold">카카오페이지</Link>
      </div>
    </div>
  )
}
