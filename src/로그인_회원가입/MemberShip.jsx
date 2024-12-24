import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Image/Logo.png'
import LoginBg from '../Image/로그인뒷배경.png' 
import kakao from '../Image/카카오 로고.png'
import naver from '../Image/네이버 로고.png'
import google from '../Image/구글 로고.png'

export default function MemberShip() {

    const login = () => {
        console.log('회원가입 클릭');
      };

  return (
    <div className='items-center justify-center w-[1280px] mx-auto'>
        <div className='border-2 border-black'>
            <div className='flex justify-center my-5 bg-white'>
                <Link to='/'>
                    <img src={Logo} alt='logo' />
                </Link>
            </div>
        </div>
        <div className="h-[850px] bg-center" style={{backgroundImage: `url(${LoginBg})`}}>
            <div className='flex-col relative top-[80px] flex w-1/3 mx-auto my-auto border-black rounded-md h-[750px] bg-black/65'>
                <div className='flex-col pt-10 pl-10'>
                    <span className='flex pb-5 text-3xl font-bold text-white'>회원가입</span>
                </div>
                  <div className='flex flex-col items-center mt-5'>
                        <div className='flex flex-col items-center w-full'>
                        <input type='text' className='flex w-3/4 pl-5 mb-5 h-[50px] text-white border-2 border-gray-500 rounded-md resize-none bg-black/50 placeholder:py-3' 
                                    placeholder="아이디" />
                        <input type='password' className='flex w-3/4 pl-5 h-[50px] text-white border-2 border-gray-500 rounded-md resize-none bg-black/50 placeholder:py-3' 
                                    placeholder="비밀번호" />
                        <input type='password' className='mt-5 flex w-3/4 pl-5 h-[50px] text-white border-2 border-gray-500 rounded-md resize-none bg-black/50 placeholder:py-3' 
                                    placeholder="비밀번호확인" />
                        <input type='text' className='mt-5 flex w-3/4 pl-5 mb-5 h-[50px] text-white border-2 border-gray-500 rounded-md resize-none bg-black/50 placeholder:py-3' 
                                    placeholder="닉네임" />
                        <button className='flex mt-5 rounded-md text-xl items-center justify-center bg-[#dc3e3e] w-3/4 h-[50px] text-white font-bold'
                                    onClick={login}>회원가입
                        </button>
                        </div>
                        <span className='mt-5 text-white'>SNS계정으로 간편하게 회원가입</span>
                        <div className='flex flex-col items-center w-full'>
                        <button className='flex mt-5 rounded-md text-xl items-center bg-[#fee500] w-3/4 h-[50px] font-bold'>
                            <img className='ml-5' src={kakao} alt='kakao' />
                            <span className='ml-14'>카카오 회원가입</span>
                        </button>
                        <button className='flex mt-5 rounded-md text-xl items-center bg-[#03c75a] w-3/4 h-[50px] font-bold'>
                            <img className='ml-5' src={naver} alt='kakao' />
                            <span className='ml-14'>네이버 회원가입</span>
                        </button>
                        <button className='flex mt-5 rounded-md text-xl items-center bg-[#4285f4] w-3/4 h-[50px] font-bold'>
                            <img className='ml-5' src={google} alt='kakao' />
                            <span className='ml-16'>구글 회원가입</span>
                        </button>
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}
