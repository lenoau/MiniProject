import React, { useState } from 'react'
import Logo from '../Image/Logo.png'
import { Link } from 'react-router-dom'

export default function Title() {

    const [ login, setLogin] = useState(false)

    const loginToggle = () => {
        setLogin((prev) => !prev);
    };

  return (
    <div className='items-center justify-center w-[1280px] mx-auto'>
        <div className='flex justify-between bg-white'>
            <Link to='/'>
                <img src={Logo} alt='logo' />
            </Link>
            <div className='flex items-center pt-5 pr-16'>
                { login ? 
                (
                    <button onClick={loginToggle} className='px-3 border-r'>로그아웃</button>
                ) : 
                (
                    <>
                        <Link to='/Login' className='px-3 border-r'>
                            <span>로그인</span>
                        </Link>

                        <Link to='/Membership' className='px-3 border-r'>
                            <span>회원가입</span>
                        </Link>
                    </>
                )}
                <Link to='/MyPage' className='px-3'> {/* MyPage 링크 추가필요 */}
                    <span>마이페이지</span>
                </Link>
            </div>
        </div>
        <div className='pt-2 border-b-2 border-black'></div>
        <section className=''> {/* gird 1col의 2row 사용 모든row -> row-span-full사용하기*/}
                <div className='flex'>
                    <span className='mx-5'><Link to='../Board'><div className='py-5 font-bold hover:text-sky-500'>커뮤니티</div></Link></span>
                    <span className='mx-5'><Link to=''><div className='py-5 font-bold hover:text-sky-500'>연재웹툰</div></Link></span>
                    <span className='mx-5'><Link to=''><div className='py-5 font-bold hover:text-sky-500'>무료웹툰</div></Link></span>
                    <span className='mx-5'><Link to=''><div className='py-5 font-bold hover:text-sky-500'>유료웹툰</div></Link></span>
                </div>
                <div className='pt-2 border-b-2 border-black'></div>
        </section>
    </div>
  )
}
