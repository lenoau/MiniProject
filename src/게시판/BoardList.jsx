import React, {useState} from 'react'
import CommentTime from '../컴포넌트List/CommentTime'

export default function BoardList(props) {

    const [leadup, seteleadUp] = useState(0);
    const [boardtup, setboardUp] = useState(0);
    
    const truncatedTitle = props.title.length > 40 ? props.title.substring(0, 40) + '...' : props.title; {/* 글자 수 40자 초과시 ...으로 표기 */}

    return (
    <tr className='border-b h-[34px] hover:bg-gray-100'>
        <td>{props.number}</td>
        <td className='truncate'>
            <a href=''>{truncatedTitle}</a>
        </td>
        <td>{props.name}</td>
        <td><CommentTime date={props.day}/></td>
        <td>{props.check}</td>
        <td>{props.up}</td>
    </tr>
    )
}
