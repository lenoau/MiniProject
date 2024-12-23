import './App.css';
import BoardMain from './게시판/BoardMain';
import Login from './로그인/Login';
import Title from './컴포넌트List/Title';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <div className='Main'>
      <BrowserRouter>
         <Routes>
          <Route path='/' element={<Title />} />
          <Route path="/로그인" element={<Login />} />
          <Route path='/게시판Main' element={<BoardMain />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}
