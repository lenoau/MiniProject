import React, { useState } from 'react';
import Close from '../Image/닫기.png';
import BoardClose from './BoardClose';
import axios from 'axios';
// import { body } from 'framer-motion/client';

export default function BoardWrite({ onClose, onNewPost }) {
    const [writeclose, setWriteClose] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // const [posts, setPosts] = useState([]);

    const PopupOpen = () => {
        setWriteClose(true);
    };

    const PopupClose2 = () => {
        setWriteClose(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

    const token = localStorage.getItem('authToken');
    console.log('error : ' , token);
    if (!token) {
            alert("로그인이 필요합니다.");
            return; // 토큰이 없으면 더 이상 진행 X
        }
    
        try {
            const response = await axios.post('http://10.125.121.117:8080/insertBoard', { title, content },
                {
                    headers: {
                        'Authorization': `${token}`, // Bearer 토큰 방식으로 인증
                        'Content-Type': 'application/json'  
                      }
                }
            );

            const newPost = response.data;
            onNewPost(newPost) // posts 배열에 newPost 추가
            alert('게시글이 등록되었습니다.');
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Error :', error);
            alert('게시글 등록에 실패했습니다.');
        }
    };

    const isSubmitEnabled = title.trim() && content.trim();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="p-5 bg-white shadow-lg w-[750px] h-[500px]">
                <div className="flex items-center justify-between mb-5">
                    <button onClick={PopupOpen}>
                        <img src={Close} alt="close" />
                    </button>
                    <span className="text-xl font-bold">글쓰기</span>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className={`text-xl font-bold ${isSubmitEnabled ? 'text-red-500' : 'text-[#94969b]'}`}
                        disabled={!isSubmitEnabled}
                    >
                        등록
                    </button>
                </div>
                <textarea
                    className="w-full p-2 border rounded h-[42px] mb-5 resize-none"
                    placeholder="제목을 입력해주세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                ></textarea>
                <textarea
                    className="w-full h-[300px] p-2 border rounded resize-none"
                    placeholder="내용을 입력해주세요"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <div className="flex justify-end mt-4"></div>
                {writeclose && <BoardClose onClose2={PopupClose2} onAllClose2={onClose} />}
            </div>
        </div>
    );
}
