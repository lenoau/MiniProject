import React from 'react'
import Title from '../웹툰화면_컴포넌트/Title'

export default function Day() {
  return (
    <div className='items-center justify-center w-[1280px] mx-auto'>
      <Title />
        <div className='flex'>
          <div className="font-bold text-2xl mt-10 mr-10">네이버</div>
          <div className="font-bold text-2xl mt-10 mr-10">카카오</div>
          <div className="font-bold text-2xl mt-10">카카오페이지</div>
        </div>
    </div>
  )
}
