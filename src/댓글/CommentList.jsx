import React from 'react'
import Comment from './Comment'

export default function CommentList( {comments} ) {
  return (
    <div>
      {comments.map((comment, index) => (
        <Comment
          key={index}
          name={comment.name}
          comment={comment.comment}
          day={new Date(comment.day).toLocaleDateString()}
        />
      ))}
    </div>
  )
}
