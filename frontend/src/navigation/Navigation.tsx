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
import { ModalsWrapper } from '../modals/ModalsWrapper';
import { useModalContext } from '../context/modalContext';

function Navigation() {
  const { typeOfModalOpen } = useModalContext();

  return (
    <>
      <Router>
        <Layout />
        {Boolean(typeOfModalOpen) && <ModalsWrapper />}
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
