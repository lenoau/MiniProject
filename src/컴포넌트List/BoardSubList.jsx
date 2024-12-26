import React from 'react'
import lead from '../Image/조회수.png'
import comment from '../Image/댓글수.png'
import leadtime from '../Image/업로드.png'
import Up from '../Image/Up.png'
import CommentList from '../댓글/CommentList'
import CommentTime from '../컴포넌트List/CommentTime'


export default function BoardSubList(props) {
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
            <img src={comment} alt="comment" className="mr-2" />
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
