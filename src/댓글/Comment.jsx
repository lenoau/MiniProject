import React from 'react'
import CommentTime from './CommentTime';
import Up from '../Image/Up.png';
import Down from '../Image/Down.png';

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
        fontSize: 12,
    },
    commentdate: {
        color: 'gray',
        fontSize: 10,
    },
    commentUD: {
        marginTop: 'auto',
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
    },
};

export default function Comment(props) {
  return (
    <div className='justify-between h-full pt-3 pb-5 border-b-2 border-gray-300 ' style = {styles.wrapper}>
        <div style = {styles.contentContainer}>
            <span style = {styles.nameText}>{props.name}</span>
            <span style = {styles.commentText}>{props.comment}</span>
            <span style = {styles.commentdate}><CommentTime date={props.day}/></span>
        </div>
        <div className='flex' style={styles.commentUD}>
            <span><img src={Up} alt='Up'/></span>
            <span><img src={Down} alt='Down' /></span>
        </div>
    </div>
  );
}
