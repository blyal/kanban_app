import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from '../layout/Layout';
import { Boards } from '../pages/Boards';
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
          <Route path='/' element={<div>Default</div>} />
          <Route path='/boards' element={<Boards />} />
          <Route path='/boards/*' element={<div>Singular Board</div>} />
          <Route path='/*' element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export { Navigation };
