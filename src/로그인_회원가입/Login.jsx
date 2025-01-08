import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../Image/Logo.png'
import axios from 'axios'
import LoginBg from '../Image/로그인뒷배경.png'
import kakao from '../Image/카카오 로고.png'
import naver from '../Image/네이버 로고.png'
import google from '../Image/구글 로고.png'
import { useAuth } from '../웹툰화면_컴포넌트/AuthProvider'

export default function Login() {

  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const [user, setUser] = useState({
    userId:'',
    password:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(
        'http://10.125.121.117:8080/login', user, 
        {
          headers: { 
            'Content-Type': 'application/json', 
          },
          withCredentials: true, 
        }
      );
      console.log('리스폰스 : ', response);

      if (response.status === 200) {
        console.log('로그인 성공:', response.data);

        // 전역 상태에 로그인 반영
        login(response.headers.get('Authorization')); // 전역 상태에 토큰 저장

        // 로컬 스토리지에 토큰 저장 (필요하면 사용)
        localStorage.setItem('authToken', response.headers.get('Authorization'));

        // 메인 페이지로 이동
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        console.error('Response Error:', error.response.data);
        setErrorMessage('로그인 정보가 일치하지 않습니다');
      } else {
        console.error('Network Error:', error.message);
        setErrorMessage('서버와의 연결에 문제가 발생했습니다.');
      }
    }
  };

  const handlesubmiAuth = async (e, provider) => {
    e.preventDefault();

    let authUrl = '';
    switch (provider) {
      case 'kakao':
        authUrl = 'http://10.125.121.117:8080/oauth2/code/kakao';
        break;
      case 'naver':
        authUrl = 'http://10.125.121.117:8080/oauth2/code/naver';
        break;
      case 'google':
        authUrl = 'http://10.125.121.117:8080/oauth2/code/google';
        break;
      default:
        console.error('Unsupported provider');
        return;
    }

    try {
      window.location.href = authUrl;
    } catch (error) {
      if (error.response) {
        console.error('Response Error:', error.response.data);
        setErrorMessage('로그인 정보가 일치하지 않습니다');
      } else {
        console.error('Network Error:', error.message);
        setErrorMessage('서버와의 연결에 문제가 발생했습니다.');
      }
    }
  }

  const enterkeydown = (e) => {
    if (e.keyCode === 13) {
      handlesubmit(e);
    }
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
          <div className='flex-col relative top-[80px] flex w-1/3 mx-auto my-auto border-black rounded-md h-[700px] bg-black/65'>
            <div className='flex-col pt-10 pl-10'>
              <span className='flex pb-5 text-3xl font-bold text-white'>로그인</span>
              <span className='flex text-2xl font-bold text-white'>ToonPidia에 오신걸 환영합니다.</span>
            </div>
            <div className='flex flex-col items-center mt-5'>
              <form className='flex flex-col items-center w-full mt-5' onSubmit={handlesubmit}>
                <div className='flex flex-col items-center w-full'>
                  <input type='text' name='userId' value={user.userId} onChange={handleChange} 
                            className='flex w-3/4 pl-5 mb-5 h-[50px] text-white border-2 border-gray-500 rounded-md resize-none bg-black/50 placeholder:py-3' 
                            placeholder="아이디" />
                  <input type='password' name='password' value={user.password} onChange={handleChange} 
                            className='flex w-3/4 pl-5 h-[50px] text-white border-2 border-gray-500 rounded-md resize-none bg-black/50 placeholder:py-3' 
                            placeholder="비밀번호"
                            onKeyDown={enterkeydown} />
                  {errorMessage && <p className='mt-2 text-sm text-red-500'>{errorMessage}</p>}
                  <button type='submit' className='flex mt-5 rounded-md text-xl items-center justify-center bg-[#dc3e3e] w-3/4 h-[50px] text-white font-bold'
                           >로그인
                  </button>
                </div>
              </form>
              <span className='mt-5 text-white'>또는</span>
              <div className='flex flex-col items-center w-full'>
                <button className='flex mt-5 rounded-md text-xl items-center bg-[#fee500] w-3/4 h-[50px] font-bold'
                        onClick={(e) => handlesubmiAuth(e, 'kakao')}>
                  <img className='ml-5' src={kakao} alt='kakao' />
                  <span className='ml-14'>카카오 로그인</span>
                </button>
                <button className='flex mt-5 rounded-md text-xl items-center bg-[#03c75a] w-3/4 h-[50px] font-bold'
                        onClick={(e) => handlesubmiAuth(e, 'naver')}>
                  <img className='ml-5' src={naver} alt='kakao' />
                  <span className='ml-14'>네이버 로그인</span>
                </button>
                <button className='flex mt-5 rounded-md text-xl items-center bg-[#4d78be] w-3/4 h-[50px] font-bold'
                        onClick={(e) => handlesubmiAuth(e, 'google')}>
                  <img className='ml-5' src={google} alt='kakao' />
                  <span className='ml-16'>구글 로그인</span>
                </button>
              </div>
            </div>
            <div className='flex items-center justify-center mt-5'>
              <span className='text-white '>회원이 아니신가요?</span>
              <Link to='/MemberShip' className='ml-5 text-[#70cfff]'>회원가입</Link>
            </div>
          </div>
        </div>
    </div>
  )
}
