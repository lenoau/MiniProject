import React from 'react'
import Logo from '../Image/Logo.png'
import { Link } from 'react-router-dom'
import BoardMain from '../게시판/BoardMain'

export default function Title() {
  return (
    <div className='items-center justify-center w-[1280px] mx-auto'>
        <div className='flex justify-between bg-white'>
            <Link to='/'> {/* 메인HOME 링크 추가필요 */}
                <img src={Logo} alt='logo' />
            </Link>
            <div className='flex items-center pt-5 pr-16'>
                <a href='' className='px-3 border-r'> {/* 로그인Page 링크 추가필요 */}
                    <span>로그인</span>
                </a>
                <a href='' className='px-3 border-r'> {/* 회원가입Page 링크 추가필요 */}
                    <span>회원가입</span>
                </a>
                <a href='' className='px-3'> {/* MyPage 링크 추가필요 */}
                    <span>마이페이지</span>
                </a>
            </div>
        </div>
        <div className='pt-2 border-b-2 border-black'></div>
        <section className=''> {/* gird 1col의 2row 사용 모든row -> row-span-full사용하기*/}
                <div className='flex'>
                    <span className='mx-5'><Link to='게시판Main'><div className='py-5 font-bold hover:text-sky-500'>커뮤니티</div></Link></span>
                    <span className='mx-5'><a href=''><div className='py-5 font-bold hover:text-sky-500'>연재웹툰</div></a></span>
                    <span className='mx-5'><a href=''><div className='py-5 font-bold hover:text-sky-500'>무료웹툰</div></a></span>
                    <span className='mx-5'><a href=''><div className='py-5 font-bold hover:text-sky-500'>유료웹툰</div></a></span>
                </div>
                <div className='pt-2 border-b-2 border-black'></div>
        </section>
    </div>
  )
}
