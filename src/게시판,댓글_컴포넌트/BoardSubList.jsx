import React, { useState, useEffect } from 'react';
import lead from '../Image/조회수.png';
import commentcount from '../Image/댓글수.png';
import leadtime from '../Image/업로드.png';
import Up from '../Image/Up.png';
import CommentList from '../댓글/CommentList';
import CommentTime from './CommentTime';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export default function BoardSubList(props) {
  const [commenting, setCommenting] = useState(false);
  const [content, setContent] = useState('');
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem('authToken');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // 쿼리 파라미터 가져오기
  const community_id = queryParams.get('id');
  // const [user, setUser] = useState(() => {
  //   const userId = localStorage.getItem('userId');
  //   return userId ? JSON.parse(userId) : { nickName: '익명' };
  // });

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://10.125.121.117:8080/comment/${community_id}`, {
          headers: {
            'Authorization': `${token}`, 
            'Content-Type': 'application/json',
          },
        });
        // response.data가 배열이 아니라면 바로 설정하도록 변경
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    fetchComments();
  }, [community_id]);
  
  const onComment = () => {
    setCommenting(true);
  };

  const closeComment = () => {
    setCommenting(false);
    setContent('');
  };

  const handleSubmit = async () => {
    // console.log('content:' , content)
    // console.log('community_id:' , community_id)
    if (content.trim()) {
      try {
          const response = await axios.post('http://10.125.121.117:8080/commentWrite', { content, community_id },
        {
          headers: {
            'Authorization': `${token}`, 
            'Content-Type': 'application/json',
          },
        }
      );
      
        setComments((prevComments) => [...prevComments, response.data]);

        setCommenting(false);
        setContent('');
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
        <div className="Name text-[#37acc9] font-bold mt-5">{props.nickName}</div>
        <div className="flex mt-5 mb-10 text-[#94969b]">
          <span className="flex mr-5 Time">
            <img src={leadtime} alt="leadtime" className="mr-2" />
            <CommentTime date={props.createDate} />
          </span>
          <span className="flex mr-5 Lead">
            <img src={lead} alt="lead" className="mr-2" />
            {props.hit}
          </span>
          <span className="flex UP">
            <img src={commentcount} alt="commentcount" className="mr-2" />
            {props.comment}
          </span>
        </div>
        <div className="pt-10 border-t Board">{props.content}</div>
        <div className="flex mt-10">
          <button className="flex" onClick={props.onUpClick}>
            <img src={Up} alt="up" className="pr-2" />
            {props.likes}
          </button>
        </div>

        <div className="w-[1150px] comment_area border border-gray-500 mt-10">
          {commenting ? (
            <div>
              <textarea
                className="w-[1100px] ml-5 mt-3 resize-none"
                rows="5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="댓글을 입력해주세요."
              ></textarea>
              <div className="flex my-2 pr-[30px] w-[1150px] justify-end">
                <button className="px-4 py-2 text-[#bbc0c5] font-bold mr-2" onClick={closeComment}>
                  취소
                </button>
                <button
                  className={`px-4 py-2 text-white font-bold ${content.trim() ? 'bg-red-500' : 'bg-[#bbc0c5]'}`}
                  onClick={handleSubmit}
                >
                  등록
                </button>
              </div>
            </div>
          ) : (
            <button className="w-full p-5 text-start" onClick={onComment}>
              댓글을 남겨주세요.
            </button>
          )}
        </div>

        <div className="pt-10 mt-10 text-2xl font-bold border-t Comment">댓글</div>
        <div className="mt-10 CommentList">
          <CommentList comments={comments} />
        </div>
      </div>
    </div>
  );
}
