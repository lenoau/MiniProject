import React from 'react'
import Comment from './Comment'

const comments = [
    {
        name: '류승진',
        comment: '첫 댓글 입니다.',
        day: new Date(),
    },
    {
        name: '김준우',
        comment: '두번째 댓글 입니다.',
        day: new Date(),
    },
];

export default function CommentList() {
  return (
    <div>
        {comments.map(comment => {
            return (
                <Comment name = {comment.name} comment = {comment.comment} day = {comment.day}/>
            );
        })};
    </div>
  );
}
