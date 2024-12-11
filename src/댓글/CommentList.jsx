import React from 'react'
import Comment from './Comment'

const comments = [
    {
        name: '류승진',
        comment: '첫 댓글 입니다.'
    },
    {
        name: '김준우',
        comment: '두번째 댓글 입니다.'
    },
];

export default function CommentList(props) {
  return (
    <div>
        {comments.map(comment => {
            return (
                <Comment name = {comment.name} comment = {comment.comment} />
            );
        })}
    </div>
  );
}
