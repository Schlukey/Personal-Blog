import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/landing/landing';
import Compose from '../pages/compose/compose';
import Posts from '../pages/post/post';

export enum RoutesList {
  Landing = '/',
  Compose = '/compose',
  Post = '/posts/:id',
}

const Router: React.FC = () => {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/compose' element={<Compose />} />
        <Route path='/posts/:id' element={<Posts />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
