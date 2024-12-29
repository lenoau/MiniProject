import React, { useState } from 'react'
import CommentTime from '../게시판,댓글_컴포넌트/CommentTime';
import Up from '../Image/Up.png';
import Down from '../Image/Down.png';

export default function Comment(props) {

const [up, setup] = useState(0);
const [down, setDown] = useState(0);

return (
  <div className='flex justify-between h-full pt-3 pb-5 border-b-2 border-gray-300'>
      <div className='flex flex-col justify-center ml-8'>
          <span className='text-[18px] text-black font-bold'>{props.name}</span>
          <span className='text-[15px] text-black'>{props.comment}</span>
          <span className='text-[12px] text-gray-600'><CommentTime date={props.day}/></span>
      </div>
      <div className='flex mt-auto'>
        <button className='flex items-center mr-2 border rounded-md' onClick={() => {setup(up + 1)}}>
            <img src={Up} alt='Up' /><span className='mx-3'>{up}</span>
        </button>
        <button className='flex items-center border rounded-md' onClick={() => {setDown(down + 1)}}>
            <img src={Down} alt='Down' /><span className='mx-3'>{down}</span>
        </button>
      </div>
  </div>
)
}
