import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Logo from '../Image/Logo.png'
import LoginBg from '../Image/로그인뒷배경.png' 
import kakao from '../Image/카카오 로고.png'
import naver from '../Image/네이버 로고.png'
import google from '../Image/구글 로고.png'

export default function MemberShip() {
    
    const [user, setUser] = useState({
        username: '',
        password: '',
        passwordcheck: '',
        nickName: '',
    });

    const [errorMessage, setErrorMessage] = useState({
        username: '',
        password: '',
        passwordcheck: '',
    });

    useEffect(() => {
        if (user.password && user.passwordcheck) {
            if (user.password !== user.passwordcheck) {
                setErrorMessage((prev) => ({ ...prev, passwordcheck: '비밀번호가 일치하지 않습니다.' }));
            } else {
                setErrorMessage((prev) => ({ ...prev, passwordcheck: '' }));
            }
        } else {
            setErrorMessage((prev) => ({ ...prev, passwordcheck: '' }));
        }
    }, [user.password, user.passwordcheck]);

    const handleChange = (e) => {
        const { id, value } = e.target;

        if (id === 'userId') {
            if (!/^[a-zA-Z0-9]*$/.test(value)) {
                setErrorMessage((prev) => ({ ...prev, username: '아이디는 영문과 숫자만 가능합니다.' }));
            } else {
                setErrorMessage((prev) => ({ ...prev, username: '' }));
            }
        }

        if (id === 'password') {
            if (/\s/.test(value)) {
                setErrorMessage((prev) => ({ ...prev, password: '공백은 사용할 수 없습니다.' }));
            } else {
                setErrorMessage((prev) => ({ ...prev, password: '' }));
            }
        }

        setUser({ ...user, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(errorMessage).some((msg) => msg !== '')) {
            alert('입력값을 확인해주세요.');
            return;
        }

        try {
            await axios.post('http://10.125.121.117:8080/join', user);
            alert('회원가입 완료');
            window.location.href = '/Login';
        } catch (error) {
            if (error.response) {
                console.error('Response Error:', error.response.data);
            } else {
                console.error('Network Error:', error.message);
            }
            alert('회원가입 실패');
        }
    };

    return (
        <div className="items-center justify-center w-[1280px] mx-auto">
            <div className="border-2 border-black">
                <div className="flex justify-center my-5 bg-white">
                    <Link to="/">
                        <img src={Logo} alt="logo" />
                    </Link>
                </div>
            </div>
            <div className="h-[950px] bg-center" style={{ backgroundImage: `url(${LoginBg})` }}>
                <div className="flex-col relative top-[80px] flex w-1/3 mx-auto my-auto border-black rounded-md h-[850px] bg-black/65">
                    <div className="flex-col pt-10 pl-10">
                        <span className="flex pb-5 text-3xl font-bold text-white">회원가입</span>
                    </div>
                    <div className="flex flex-col items-center mt-5">
                        <div className="flex flex-col items-center w-full">
                            <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    id="userId"
                                    value={user.userId}
                                    onChange={handleChange}
                                    placeholder="아이디"
                                    className={`flex w-3/4 pl-5 mb-5 h-[50px] text-white border-2 rounded-md resize-none bg-black/50 placeholder:py-3 
                                        ${ errorMessage.username ? 'border-red-500' : 'border-gray-500' }`}
                                />
                                {errorMessage.username && (
                                    <div className="mb-2 text-sm text-red-400">{errorMessage.username}</div>
                                )}
                                <div className="mb-2 text-sm text-gray-300">영문, 숫자를 포함한 6자 이상의 비밀번호를 입력해주세요.</div>
                                <input
                                    type="password"
                                    id="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    placeholder="비밀번호"
                                    className={`flex w-3/4 pl-5 h-[50px] text-white border-2 rounded-md resize-none bg-black/50 placeholder:py-3
                                        ${errorMessage.password || errorMessage.passwordcheck ? 'border-red-500' : 'border-gray-500'}`}
                                />
                                {errorMessage.password && (
                                    <div className="mt-2 text-sm text-red-500">{errorMessage.password}</div>
                                )}
                                <input
                                    type="password"
                                    id="passwordcheck"
                                    value={user.passwordcheck}
                                    onChange={handleChange}
                                    placeholder="비밀번호 확인"
                                    className={`mt-5 flex w-3/4 pl-5 h-[50px] text-white border-2 rounded-md resize-none bg-black/50 placeholder:py-3
                                        ${errorMessage.passwordcheck ? 'border-red-500' : 'border-gray-500'}`}
                                />
                                {errorMessage.passwordcheck && (
                                    <div className="mt-2 text-sm text-red-500">{errorMessage.passwordcheck}</div>
                                )}
                                <input
                                    type="text"
                                    id="nickName"
                                    value={user.nickName}
                                    onChange={handleChange}
                                    placeholder="닉네임"
                                    className="mt-5 flex w-3/4 pl-5 mb-5 h-[50px] text-white border-2 border-gray-500 rounded-md resize-none bg-black/50 placeholder:py-3"
                                />
                                <button
                                    type="submit"
                                    className="flex mt-5 rounded-md text-xl items-center justify-center bg-[#dc3e3e] w-3/4 h-[50px] text-white font-bold"
                                >
                                    회원가입
                                </button>
                            </form>
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
