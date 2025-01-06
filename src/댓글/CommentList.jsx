import React from 'react'
import Comment from './Comment'

export default function CommentList( {comments} ) {
  
  const safeComments = Array.isArray(comments) ? comments : [];

  console.log('comments:', safeComments);

  return (
    <div>
        {safeComments.length === 0 ? (
        <p>댓글이 없습니다.</p>
      ) : (
        safeComments.map((comment, index) => (
          <Comment
            key={index}
            nickName={comment.nickName}
            content={comment.content}
            createDate={new Date(comment.createDate.replace(' ', 'T'))}
          />
        ))
      )}
    </div>
  )
}
