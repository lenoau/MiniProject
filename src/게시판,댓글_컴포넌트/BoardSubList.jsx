import React, { useState, useEffect } from 'react';
import lead from '../Image/조회수.png';
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
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태 추가
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);

  const token = localStorage.getItem('authToken');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // 쿼리 파라미터 가져오기
  const community_id = queryParams.get('id');


  //댓글 출력
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://10.125.121.117:8080/comment/${community_id}`, {
          headers: {
            'Authorization': `${token}`, 
            'Content-Type': 'application/json',
          },
        });
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


  //댓글 작성
  const handleSubmit = async () => {
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

  const handleEdit = () => {
    setIsEditing(true); // 수정 모드 활성화
  };

  const cancelEdit = () => {
    setIsEditing(false); // 수정 취소
    setEditedTitle(props.title);
    setEditedContent(props.content);
  };


  //게시글 수정
  const submitEdit = async () => {
    if (!editedTitle.trim() || !editedContent.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }
    try {
     const response =  await axios.put('http://10.125.121.117:8080/updateBoard', 
        {
          title: editedTitle,
          content: editedContent,
        },
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        // 수정 완료 후 UI 업데이트
        props.onUpdate({
          id: props.id,
          title: editedTitle,
          content: editedContent,
        });
        setIsEditing(false); // 수정 모드 비활성화
        alert('게시글이 수정되었습니다.');
      } else {
        alert('수정에 실패했습니다. 다시 시도해주세요.');
      }

    } catch (error) {
      console.error('Error updating post:', error);
      alert('수정에 실패했습니다.');
    }
  };

  //게시글 삭제
  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
       const response = await axios.delete(`http://10.125.121.117:8080/deletBoard/${community_id}`, {
          headers: {
            Authorization: `${token}`,  
          },
          withCredentials: true,
        });
        
        if (response.status === 200) {
          // 삭제 완료 후 부모 컴포넌트에서 제거
          props.onDelete(props.id);
          alert('게시글이 삭제되었습니다.');
        } else {
          alert('삭제에 실패했습니다. 다시 시도해주세요.');
        }
        
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('삭제에 실패했습니다.');
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col mt-10">
        <span className="text-3xl font-bold Title">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="제목을 입력하세요"
            />
          ) : (
            props.title
          )}
        </span>
        <div className="Name text-[#37acc9] font-bold mt-5">{props.nickName}</div>
        <div className="flex mt-5 mb-10 text-[#94969b]">
          <span className="flex mr-5">
            <img src={leadtime} alt="leadtime" className="pb-4 mr-2" />
            <CommentTime date={props.createDate} />
          </span>
          <span className="flex pb-4 mr-5">
            <img src={lead} alt="lead" className="mr-2" />
            {props.hit}
          </span>
          <div className='ml-[900px]'>
            {isEditing ? (
              <>
                <button className='p-2 mr-5 bg-[#bbc0c5] rounded-md text-white font-bold' onClick={submitEdit}>
                  저장
                </button>
                <button className='p-2 mr-5 bg-[#bbc0c5] rounded-md text-white font-bold' onClick={cancelEdit}>
                  취소
                </button>
              </>
            ) : (
              <>
                <button className='p-2 mr-5 bg-[#bbc0c5] rounded-md text-white font-bold' onClick={handleEdit}>
                  수정
                </button>
                <button className='p-2 mr-5 font-bold text-white bg-red-500 rounded-md' onClick={handleDelete}>
                  삭제
                </button>
              </>
            )}
          </div>
        </div>
        <div className="pt-10 border-t Board">
          {isEditing ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              placeholder="내용을 입력하세요"
              rows="5"
              className="w-full"
            />
          ) : (
            props.content
          )}
        </div>
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
