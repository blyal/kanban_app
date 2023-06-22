import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from './layout/Layout';
import { useGetBoards } from './api/useBoardsApi';
import { Boards } from './pages/Boards';

function Navigation() {
  const { boards } = useGetBoards();
  console.log(boards);
  return (
    <div>
      <Router>
        <Layout />
        <Routes>
          <Route path='/' element={<div>Default</div>} />
          <Route path='/boards' element={<Boards boards={boards} />} />
          <Route path='/board/*' element={<div>Singular Board</div>} />
          <Route path='/*' element={<div>404</div>} />
        </Routes>
      </Router>
    </div>
  );
}

export { Navigation };
