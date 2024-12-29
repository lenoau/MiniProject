import './App.css';
import BoardMain from './게시판/BoardMain';
import BoardSub from './게시판/BoardSub';
import Login from './로그인_회원가입/Login';
import MemberShip from './로그인_회원가입/MemberShip';
import Main from './메인_웹툰화면/Main';
import MyPage from './게시판/MyPage';
import Day from './메인_웹툰화면/DayWebtoon';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <div className='Main'>
      <BrowserRouter>
        <Routes>
          <Route path='/MyPage' element={<MyPage />} />
          <Route path='/BoardSub' element={<BoardSub />} />
          <Route path='/' element={<Main />} />
          <Route path='/day' element={<Day />} />
          <Route path='/Login' element={<Login />} />
          <Route path="/Membership" element={<MemberShip />} />
          <Route path='/Board' element={<BoardMain />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}
