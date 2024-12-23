import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Image/Logo.png'
import LoginBg from '../Image/로그인페이지.png'

export default function Login() {
  return (
    <div className='items-center justify-center w-[1280px] mx-auto'>
        <div className='flex justify-center my-5 bg-white'>
            <Link to='/'>
                <img src={Logo} alt='logo' />
            </Link>
        </div>
        <div className="h-[850px] bg-center opacity-50" style={{backgroundImage: `url(${LoginBg})`}}></div>
    </div>
  )
}
