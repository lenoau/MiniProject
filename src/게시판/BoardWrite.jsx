import React, { useState } from 'react'
import Close from '../Image/닫기.png'
import BoardClose from './BoardClose';
import axios from 'axios';

export default function BoardWrite({onClose}) {

    const [writeclose, setWriteClose] = useState(false)

    const PopupOpen = () => {
        setWriteClose(true);
    };

    const PopupClose2 = () => {
        setWriteClose(false);
    };

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const SubmitColor = title.trim() && content.trim();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values().some((msg) => msg !== '')) {
            alert('게시글을 확인해 주세요')
            return;
        }

        try {
            await axios.post('http://10.125.121.117:8080/join');
        } catch (error) {
            if (error.response) {
                console.error('Response Error:', error.response.data);
            } else {
                console.error('Network Error:', error.message);
            }
            alert('등록 실패');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="p-5 bg-white shadow-lg w-[750px] h-[500px]">
                <div className='flex items-center justify-between mb-5' onSubmit={handleSubmit}>
                    <button onClick={PopupOpen}><img src={Close} alt='close' /></button>
                    <span className="text-xl font-bold">글쓰기</span>
                    <button
                        type='submit'
                        className={`text-xl font-bold ${SubmitColor ? 'text-red-500' : 'text-[#94969b]'}`}
                    >
                        등록
                    </button>
                </div>
                <textarea className="w-full p-2 border rounded h-[42px] mb-5 resize-none" placeholder="제목을 입력해주세요" value={title} onChange={(e) => setTitle(e.target.value)}></textarea>
                <textarea className="w-full h-[300px] p-2 border rounded resize-none" placeholder="내용을 입력해주세요" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <div className="flex justify-end mt-4"></div>
                {writeclose && <BoardClose onClose2={PopupClose2}
                                           onAllClose2={onClose} />}
            </div>
      </div>
  )
}
