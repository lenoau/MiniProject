import React from 'react'
import CommentTime from './CommentTime';

const styles =  {
    wrapper: {
        margin: 8,
        display: 'flex',
        flexDirection: "row",
    },
    imageContainer: {},
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    contentContainer: {
        marginLeft: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    nameText: {
        color: 'black',
        fontsize: 16,
        fontWeight: 'bold',
    },
    commentText: {
        color: 'black',
        fontSize: 16,
    },
};

export default function Comment(props) {
  return (
    <div className='border-b-2 border-gray-300 pb-5 pt-3' style = {styles.wrapper}>
        <div style = {styles.imageContainer}>
            <img src='https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
             style = {styles.image} />
        </div>

        <div style = {styles.contentContainer}>
            <span style = {styles.nameText}>{props.name}</span>
            <span style = {styles.commentText}>{props.comment}</span>
            <span><CommentTime /></span>
        </div>
    </div>
  );
}
