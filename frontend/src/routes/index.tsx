import { Route, Routes } from 'react-router-dom';
import WatchPage from '../features/watch';
import HomePage from '../features/home';
import NotFoundPage from '../features/not-found';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/watch' element={<WatchPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
