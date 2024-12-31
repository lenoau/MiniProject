import React from 'react'
import lead from '../Image/조회수.png'
import commentcount from '../Image/댓글수.png'
import leadtime from '../Image/업로드.png'
import Up from '../Image/Up.png'
import CommentList from '../댓글/CommentList'
import CommentTime from './CommentTime'
import { useState, useEffect } from 'react'
import axios from 'axios'


export default function BoardSubList(props) {

  const [commenting, setCommenting] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://10.125.121.117:8080/comments/${props.postId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error :', error);
      }
    };

    fetchComments();
  }, [props.postId]);

  const onComment = () => {
    setCommenting(true);
  };

  const closeComment = () => {
    setCommenting(false);
    setComment('');
  };

  const handleSubmit = async () => {
    if (comment.trim()) {
      try {
        const newComment = {
          name: '사용자 이름', // DB와 같은 이름으로 맞추기
          comment: comment,
          day: new Date(),
        };

        // 서버에 댓글 저장
        const response = await axios.post(`http://10.125.121.117:8080/comments/${props.postId}`, newComment);

        // 서버에서 반환된 데이터로 댓글 목록 업데이트
        setComments((prevComments) => [...prevComments, response.data]);

        setCommenting(false);
        setComment('');
      } catch (error) {
        console.error('Error submitting comment:', error);
        alert('댓글 작성에 실패했습니다.');
      }
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
            {comments.length}
          </span>
        </div>
        <div className="pt-10 border-t Board">{props.content}</div>
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
          className='w-full p-5 text-start' onClick={onComment}>
          댓글을 남겨주세요.
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
