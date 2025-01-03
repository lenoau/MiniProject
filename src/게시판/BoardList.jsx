import React from 'react'
import { Link } from 'react-router-dom'
import CommentTime from '../게시판,댓글_컴포넌트/CommentTime'

export default function BoardList(props) {
    
    const sliceTitle = props.title.length > 40 ? props.title.substring(0, 40) + '...' : props.title
    console.log('propsID :' , props.id)
    return (
    <tr className='border-b h-[34px] hover:bg-gray-100'>
        <td>{props.id}</td>
        <td>
            <Link to={`../BoardSub?id=${props.id}`}>{sliceTitle}</Link>
        </td>
        <td>{props.nickName}</td>
        <td><CommentTime date={props.createdate}/></td>
        <td>{props.hit}</td>
        <td>{props.likes}</td>
    </tr>
    )
}
