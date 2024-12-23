import React, { useState } from 'react'
import Close from '../Image/닫기.png'

export default function BoardWrite({ onClose }) {
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="p-5 bg-white shadow-lg w-[750px] h-[500px]">
                <div className='flex items-center justify-between mb-5'>
                    <button onClick={onClose} className=""><img src={Close} alt='close' /></button>
                    <span className="text-xl font-bold">글쓰기</span>
                    <button className="text-xl font-bold text-[#94969b]">등록</button>
                </div>
                <textarea className="w-full p-2 border rounded h-[42px] mb-5" placeholder="제목을 입력해주세요"></textarea>
                <textarea className="w-full h-[300px] p-2 border rounded" placeholder="내용을 입력해주세요"></textarea>
                <div className="flex justify-end mt-4">
                    
                    
                </div>
            </div>
      </div>
  )
}
