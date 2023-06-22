import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { Boards } from '../pages/Boards';
import { BoardsProvider } from '../context/boardsContext';
import { NotFoundPage } from './NotFoundPage';

function Navigation() {
  return (
    <>
      <BoardsProvider>
        <Router>
          <Layout />
          <Routes>
            <Route path='/' element={<div>Default</div>} />
            <Route path='/boards' element={<Boards />} />
            <Route path='/boards/*' element={<div>Singular Board</div>} />
            <Route path='/*' element={<NotFoundPage />} />
          </Routes>
        </Router>
      </BoardsProvider>
    </>
  );
}

export { Navigation };
