import './App.css';
import BoardMain from './게시판/BoardMain';
import Title from './컴포넌트List/Title';
import Write from './게시판/BoardWrite';
import { Route, Routes, Link, BrowserRouter } from 'react-router-dom';

export default function App() {
  return (
    <div className='Main'>
      {/* <Write /> */}
      <BrowserRouter>
         <Routes>
          <Route path='/' element={<Title />} />
          <Route path='/게시판Main' element={<BoardMain />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}
