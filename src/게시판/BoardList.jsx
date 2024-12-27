import React from 'react'
import { Link } from 'react-router-dom'
import CommentTime from '../컴포넌트List/CommentTime'

export default function BoardList(props) {
    
    const sliceTitle = props.title.length > 40 ? props.title.substring(0, 40) + '...' : props.title

    return (
    <tr className='border-b h-[34px] hover:bg-gray-100'>
        <td>{props.number}</td>
        <td>
            <Link to='../BoardSub'>{sliceTitle}</Link>
        </td>
        <td>{props.name}</td>
        <td><CommentTime date={props.day}/></td>
        <td>{props.check}</td>
        <td>{props.up}</td>
    </tr>
    )
}
