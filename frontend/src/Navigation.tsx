import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { Boards } from './pages/Boards';
import { BoardsProvider } from './context/boardsContext';

function Navigation() {
  return (
    <div>
      <BoardsProvider>
        <Router>
          <Layout />
          <Routes>
            <Route path='/' element={<div>Default</div>} />
            <Route path='/boards' element={<Boards />} />
            <Route path='/board/*' element={<div>Singular Board</div>} />
            <Route path='/*' element={<div>404</div>} />
          </Routes>
        </Router>
      </BoardsProvider>
    </div>
  );
}

export { Navigation };
