import React from 'react'
import lead from '../Image/조회수.png'
import commentcount from '../Image/댓글수.png'
import leadtime from '../Image/업로드.png'
import Up from '../Image/Up.png'
import CommentList from '../댓글/CommentList'
import CommentTime from '../컴포넌트List/CommentTime'
import { useState } from 'react'


export default function BoardSubList(props) {

  const [commenting, setCommenting] = useState(false);
  const [comment, setComment] = useState('');

  const onComment = () => {
    setCommenting(true);
  };

  const closeComment = () => {
    setCommenting(false);
    setComment('');
  };

  const handleSubmit = () => {
    if (comment.trim()) {
      // 댓글 제출 추가
      console.log('댓글 제출:', comment);
      setCommenting(false);
      setComment('');
    } else {
      alert('댓글을 입력해주세요.');
    }
  };

  return (
    <div>
      <div className="flex flex-col mt-10">
        <span className="text-3xl font-bold Title">{props.title}</span>
        <div className="Name text-[#37acc9] font-bold mt-5">{props.name}</div>
        <div className="flex mt-5 mb-10 text-[#94969b]">
          <span className="flex mr-5 Time">
            <img src={leadtime} alt="leadtime" className="mr-2" />
            <CommentTime date={props.day} />
          </span>
          <span className="flex mr-5 Lead">
            <img src={lead} alt="lead" className="mr-2" />
            {props.check}
          </span>
          <span className="flex UP">
            <img src={commentcount} alt="commentcount" className="mr-2" />
            {props.comment}
          </span>
        </div>
        <div className="pt-10 border-t Board">안녕하세요 첫 글 입니다.</div>
        <div className="flex mt-10">
          <button className="flex" onClick={props.onUpClick}>
            <img src={Up} alt="up" className="pr-2" />
            {props.up}
          </button>
        </div>
        <div className='w-[1150px] comment_area border border-gray-500 mt-10'>
        {commenting ? (
        <div>
          <textarea
            className='w-[1100px] ml-5 mt-3 resize-none'
            rows='5'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='댓글을 입력해주세요.'>
          </textarea>
          <div className='flex my-2 pr-[30px] w-[1150px] justify-end'>
            <button
              className='px-4 py-2 text-[#bbc0c5] font-bold mr-2'
              onClick={closeComment}>취소
            </button>
            <button
              className={`px-4 py-2 text-white font-bold ${comment.trim() ? 'bg-red-500' : 'bg-[#bbc0c5]'}`}
              onClick={handleSubmit}>등록
            </button>
          </div>
        </div>
      ) : (
        <button
          className='p-5 w-full text-start'
          onClick={onComment}>댓글을 남겨주세요.
        </button>
      )}
        </div>
        <div className="pt-10 mt-10 text-2xl font-bold border-t Comment">
          댓글 {2}
        </div>
        <div className="mt-10 CommentList">
          <CommentList />
        </div>
      </div>
    </div>
  );
}
