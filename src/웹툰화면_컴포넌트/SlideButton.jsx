import React from 'react'

export default function SlideButton({ direction, onClick, disabled }) {
  return (
    <div>
         <button
            className={`absolute ${direction === 'left' ? 'left-[-50px]' : 'right-[-50px]'} px-4 py-2 disabled:opacity-50 top-[43%]`}
            onClick={onClick}
            disabled={disabled}
        >
            <img src={direction === 'left' ? require('../Image/left.png') : require('../Image/right.png')} alt={direction} />
        </button>
    </div>
  )
}
