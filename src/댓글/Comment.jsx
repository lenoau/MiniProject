import React, { useState } from 'react'
import CommentTime from '../컴포넌트List/CommentTime';
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
          <img src={Up} alt='Up' onClick={() => {setup(up + 1)}}/><span className='mx-3'>{up}</span>
          <img src={Down} alt='Down' onClick={() => {setDown(down + 1)}}/><span className='mx-3'>{down}</span>
      </div>
  </div>
);
}
