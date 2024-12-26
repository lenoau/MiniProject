import React from 'react'
import Title from '../컴포넌트List/Title'
import { useState } from 'react'
import BoardSubList from '../컴포넌트List/BoardSubList'


export default function BoardSub() {
    const [boardData, setBoardData] = useState([
      {
        number: 1,
        title: '안녕하세요 첫 글입니다 안녕하세요 첫 글 입니다 40자 초과시켜 봅시다 제에바앙랑랑제발나와라아린아런이',
        name: '류승진',
        day: new Date(),
        check: 20,
        comment: 2,
        up: 0,
      },
    ]);
  
    const handleUpClick = (index) => {
      setBoardData((Data) =>
        Data.map((item, idx) =>
          idx === index ? { ...item, up: item.up + 1 } : item
        )
      );
    };
  
    return (
      <div className="items-center justify-center w-[1280px] mx-auto">
        <Title />
        <div>
          {boardData.map((item, index) => (
            <BoardSubList
              key={index}
              title={item.title}
              name={item.name}
              day={item.day}
              check={item.check}
              comment={item.comment}
              up={item.up}
              onUpClick={() => handleUpClick(index)}
            />
          ))}
        </div>
      </div>
    );
  }
