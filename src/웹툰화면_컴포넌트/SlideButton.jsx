import React from 'react';
import leftArrow from '../Image/left.png';
import rightArrow from '../Image/right.png';

export default function SlideButton({ direction, onClick, disabled }) {
    return (
        <button
            className={`absolute ${direction === 'left' ? 'left-[-50px]' : 'right-[-50px]'} 
                        px-4 py-2 top-[43%] z-10 disabled:opacity-50`}
            onClick={onClick}
            disabled={disabled}
        >
            <img
                src={direction === 'left' ? leftArrow : rightArrow}
                alt={direction}
            />
        </button>
    );
}
