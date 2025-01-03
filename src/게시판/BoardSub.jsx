import React from 'react'
import Title from '../웹툰화면_컴포넌트/Title'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import BoardSubList from '../게시판,댓글_컴포넌트/BoardSubList'

export default function BoardSub() {
    const [boardData, setBoardData] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search); // 쿼리 파라미터 가져오기
    const id = queryParams.get('id'); // 'id' 파라미터 값 가져오기
  
    const handleUpClick = (index) => {
      setBoardData((prevData) =>
        prevData.map((item, idx) =>
          idx === index ? { ...item, up: item.up + 1 } : item
        )
      );
    };


    const fetchBoardData = async () => {
      console.log("id : ", id)
      try {
        const response = await axios.get(`http://10.125.121.117:8080/board/${id}`)
        setBoardData([response.data])
      } catch (error) {
        console.error('Error :', error);
              alert('게시글을 가져오는데 실패했습니다.');
      }
    };
  
    useEffect(() => {
      if (id) {
        fetchBoardData();
      } else {
        console.error('Invalid id:', id);
      }
    }, [id]);
  
    return (
      <div className="items-center justify-center w-[1280px] mx-auto">
        <Title />
        <div>
          {boardData.map((item) => (
            <BoardSubList
              key={item.id}
              title={item.title}
              nickName={item.nickName}
              createDate= {new Date(item.createDate.replace(' ', 'T'))}
              hit={item.hit}
              content={item.content}
              likes={item.likes}
              onUpClick={() => handleUpClick(item.id)}
            />
          ))}
        </div>
      </div>
    );
  }
