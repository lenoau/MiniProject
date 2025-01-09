import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Left from '../Image/left.png'
import Right from '../Image/right.png'
// import Search from '../Image/검색마크.png'
import BoardList from './BoardList'
import Title from '../웹툰화면_컴포넌트/Title'
import BoardWrite from './BoardWrite'

export default function Board() {

    const [writeopen, setWriteOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [boardData, setBoardData] = useState([]);

    const PopupOpen = () => {
        setWriteOpen(true);
    };

    const PopupClose = () => {
        setWriteOpen(false);
    };

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    const token = localStorage.getItem('authToken');

  console.log(token)
  const fetchBoardData = async () => {
    try {
      const response = await axios.get('http://10.125.121.117:8080/board')

      setBoardData(response.data)
    } catch (error) {
      console.error('Error :', error);
    }
  };

  const handleNewPost = (newPost) => {
    setBoardData((prevData) => [newPost, ...prevData]);
    PopupClose(); // 글쓰기 팝업 닫기
};

  useEffect(() => {
    fetchBoardData();
}, [boardData]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(boardData.length / itemsPerPage);

  const currentData = boardData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
                  {currentData.map((item, index) => (
                  <BoardList 
                    key = {index}
                    id = {item.id}
                    title = {item.title}
                    nickName = {item.nickName}
                    createdate = {new Date(item.createDate.replace(' ', 'T'))}
                    hit = {item.hit}
                    likes = {item.likes}
                  />
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end mt-5">
                <button onClick={PopupOpen} className="inline-block">
                  <div className="p-2 font-bold text-center border-2 bg-slate-200">글쓰기</div>
                </button>
                {writeopen && <BoardWrite onClose={PopupClose} onNewPost={handleNewPost} />}
              </div>
            </div>
          </section>
          <div className='col-span-2 col-start-3 text-center mt-[80px]'> {/* grid 2칸사용 및 grid 3번째 블록부터 시작*/}
          <ul className="flex items-center justify-center text-lg">
              <li className="items-center justify-center mr-4">
                  <button
                      onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`flex items-end ${currentPage === 1 ? 'opacity-50' : ''}`}
                  >
                      <img src={Left} alt="Left" />
                      이전
                  </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                  <li key={i} className="mr-4">
                      <button
                          onClick={() => handlePageChange(i + 1)}
                          className={`px-3 py-1 ${currentPage === i + 1 ? 'font-bold text-sky-500' : ''}`}
                      >
                          {i + 1}
                      </button>
                  </li>
              ))}
              <li className="flex items-center ml-4">
                  <button
                      onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`flex items-end ${currentPage === totalPages ? 'opacity-50' : ''}`}
                  >
                      다음
                      <img src={Right} alt="Right" />
                  </button>
              </li>
          </ul>
          {/* <div className='SearchCategory inline-flex items-center justify-center mt-8 border-2 mb-[200px]'>
            <select className='h-[40px] pr-10 border-r-2'>
              <option>제목</option>
              <option>글쓴이</option>
            </select>
            <input className='h-[40px] w-[230px]' type='text' name='keyword' />
            <button className='Search h-[40px] w-[60px] pl-3 border-l-2' type='submit'><img src={Search} alt='search' /></button>
          </div> */}
        </div>
        </article>
    </div>
  )
}
