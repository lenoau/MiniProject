import './App.css';
import BoardMain from './게시판/BoardMain';
import Login from './로그인_회원가입/Login';
import MemberShip from './로그인_회원가입/MemberShip';
import Main from './메인_웹툰화면/Main';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <div className='Main'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/Login' element={<Login />} />
          <Route path="/Membership" element={<MemberShip />} />
          <Route path='/Board' element={<BoardMain />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}
