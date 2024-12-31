import './App.css';
import BoardMain from './게시판/BoardMain';
import BoardSub from './게시판/BoardSub';
import Login from './로그인_회원가입/Login';
import MemberShip from './로그인_회원가입/MemberShip';
import Main from './메인_웹툰화면/Main';
import MyPage from './게시판/MyPage';
import Day from './메인_웹툰화면/DayWebtoon';
import NaverMain from './NaverDay/NaverMain';
import KakaoMain from './KakaoDay/KakaoMain';
import KakaoPageMain from './KakaoPageDay/KakaoPageMain';
import DayNaver from './NaverDay/DayNaver';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import DayKakao from './KakaoDay/DayKakao';
import DayKakaoPage from './KakaoPageDay/DayKakaoPage';
import { AuthProvider } from './웹툰화면_컴포넌트/AuthProvider';

export default function App() {
  return (
    <div className='Main'>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* 기본 메인 페이지 */}
            <Route path='/' element={<Main />} />

            {/* 로그인 및 회원가입 */}
            <Route path='/Login' element={<Login />} />
            <Route path='/Membership' element={<MemberShip />} />

            {/* 게시판 관련 */}
            <Route path='/Board' element={<BoardMain />} />
            <Route path='/BoardSub' element={<BoardSub />} />
            <Route path='/MyPage' element={<MyPage />} />

            {/* 연재웹툰 메인 */}
            <Route path='/day' element={<Day />} />

            {/* 요일별웹툰 메인 */}
            <Route path='/day/NaverMain/' element={<NaverMain />} />
            <Route path='/day/KakaoMain' element={<KakaoMain />} />
            <Route path='/day/KakaoPageMain' element={<KakaoPageMain />} />

            {/* 요일별 전체웹툰 */}
            <Route path='/day/NaverMain/:id' element={<DayNaver />} />
            <Route path='/day/KakaoMain/:id' element={<DayKakao />} />
            <Route path='/day/KakaoPageMain/:id' element={<DayKakaoPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
