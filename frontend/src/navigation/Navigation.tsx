import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { Boards } from '../pages/Boards';
import { Board } from '../pages/Board';
import { NotFoundPage } from './NotFoundPage';

function Navigation() {
  return (
    <>
      <Router>
        <Layout />
        <Routes>
          <Route path='/' element={<Navigate to='/boards' />} />
          <Route path='/boards' element={<Boards />} />
          <Route path='/boards/:boardId' element={<Board />} />
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export { Navigation };
