import React from 'react'

export default function BoardClose( {onClose2, onAllClose2} ) {
  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
        <div className="p-5 bg-white shadow-lg w-[400px] h-[170px]">
            <div className='flex items-center justify-center my-5'>
                <span className="">작성을 취소 하시겠습니까?</span>
            </div>
            <div className='flex items-center justify-center'>
                <button onClick={onClose2} className="text-white bg-[#bbc0c5] w-full h-[48px] mx-3">유지</button>
                <button onClick={onAllClose2} className="bg-[#222222] text-white w-full h-[48px] mx-3">작성 취소</button>
            </div>
        </div>
    </div>
  )
}
