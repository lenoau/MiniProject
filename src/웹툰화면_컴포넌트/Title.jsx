import Logo from '../Image/Logo.png'
import { Link, useNavigate } from 'react-router-dom'
// import { useAuth } from './AuthProvider'
import { useEffect, useState } from 'react';

export default function Title() {

    // const { isLoggedIn, logout } = useAuth(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            navigate('/');
        }
    },[isLoggedIn]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        // logout();
        setIsLoggedIn(false);
        navigate('/');
    }

  return (
    <div className='items-center justify-center w-[1280px] mx-auto'>
        <div className='flex justify-between bg-white'>
            <Link to='/'>
                <img src={Logo} alt='logo' />
            </Link>
            <div className='flex items-center pt-5 pr-16'>
                { isLoggedIn ? 
                (
                    <>
                        <button onClick={handleLogout} className='px-3 border-r'>
                            로그아웃
                        </button>
                        
                        <Link to='/MyPage' className='px-3'>
                            <span>마이페이지</span>
                        </Link>
                    </>
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
                
            </div>
        </div>
        <div className='pt-2 border-b-2 border-black'></div>
        <section className=''> 
                <div className='flex'>
                    <span className='mx-5'><Link to='../Board'><div className='py-5 font-bold hover:text-sky-500'>커뮤니티</div></Link></span>
                    <span className='mx-5'><Link to='/day'><div className='py-5 font-bold hover:text-sky-500'>연재웹툰</div></Link></span>
                </div>
                <div className='pt-2 border-b-2 border-black'></div>
        </section>
    </div>
  )
}