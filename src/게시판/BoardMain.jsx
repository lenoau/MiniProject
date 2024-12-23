import React from 'react'
import { useState } from 'react'

import Left from '../Image/left.png'
import Right from '../Image/right.png'
import Search from '../Image/검색마크.png'
import BoardList from './BoardList'
import Title from '../컴포넌트List/Title'
import BoardWrite from './BoardWrite'

export default function Board() {

    const [writeopen, setWriteOpen] = useState(false)

    const PopupOpen = () => {
        setWriteOpen(true);
    };

    const PopupClose = () => {
        setWriteOpen(false);
    };

  const boardData = [
    { number: 1, title: '안녕하세요 첫 글입니다 안녕하세요 첫 글 입니다 40자 초과시켜 봅시다 제에바앙랑랑제발나와라아린아런이', name: '류승진', day: new Date(), check: 20, up: 0 },
    { number: 2, title: '두 번째 글입니다', name: '김준우', day: new Date(), check: 15, up: 3 },
    { number: 3, title: '나혼렙 존잼', name: '정원영', day: new Date(), check: 10, up: 5 },
  ];

  return (
    <div>
        <Title />
        <article className='items-center justify-center w-[1280px] mx-auto'>
          <section>
            <div>
              <table className="w-full text-sm">
                <thead class="font-bold border-b">
                    <tr>
                      <th className='px-5 py-2 w-[100px]'>번호</th>
                      <th className='px-5 py-2 w-[540px]'>제목</th>
                      <th className='px-5 py-2 w-[150px]'>글쓴이</th>
                      <th className='px-5 py-2 w-[88px]'>등록일</th>
                      <th className='px-5 py-2 w-[70px]'>조회</th>
                      <th className='px-5 py-2 w-[70px]'>추천</th>
                    </tr>
                </thead>
                <tbody className="text-center bg-white">
                  {boardData.map((item, index) => (
                  <BoardList 
                    key = {index}
                    number = {item.number}
                    title = {item.title}
                    name = {item.name}
                    day = {item.day}
                    check = {item.check}
                    up = {item.up}
                  />
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end mt-5">
                <button onClick={PopupOpen} className="inline-block">
                  <div className="p-2 font-bold text-center border-2 bg-slate-200">글쓰기</div>
                </button>
                {writeopen && <BoardWrite onClose={PopupClose} />}
              </div>
            </div>
          </section>
          <div className='col-span-2 col-start-3 text-center mt-[80px]'> {/* grid 2칸사용 및 grid 3번째 블록부터 시작*/}
            <ul className='flex items-center justify-center text-lg'>
              <li className='items-center justify-center mr-4'>
                <a href='' className='flex items-end'> {/* 이전10개 page로 이동 링크 추가필요 */}
                  <img src={Left} alt='Left' />
                  이전
                </a>
              </li>
              <a href=''><li className='mr-4'>1</li></a>
              <a href=''><li className='mr-4'>2</li></a>
              <a href=''><li className='mr-4'>3</li></a>
              <a href=''><li className='mr-4'>4</li></a>
              <a href=''><li className='mr-4'>5</li></a>
              <a href=''><li className='mr-4'>6</li></a>
              <a href=''><li className='mr-4'>7</li></a>
              <a href=''><li className='mr-4'>8</li></a>
              <a href=''><li className='mr-4'>9</li></a>
              <a href=''><li className=''>10</li></a>
              <li className='flex items-center ml-4'>
                <a href='' className='flex items-end'> {/* 다음10개 page로 이동 링크 추가필요 */}
                  다음
                  <img src={Right} alt='Right' />
                </a>
              </li>
            </ul>
            <div className='inline-flex items-center justify-center mt-8 border-2 mb-[200px]'>
              <select className='h-[40px] pr-10 border-r-2'>
                <option>제목</option>
                <option>내용</option>
                <option>닉네임</option>
              </select>
              <input className='h-[40px] w-[230px]' type='text' name='keyword' />
              <button className='h-[40px] w-[60px] pl-3 border-l-2' type='submit'><img src={Search} alt='search' /></button>
            </div>
          </div>
        </article>
    </div>
  )
}
