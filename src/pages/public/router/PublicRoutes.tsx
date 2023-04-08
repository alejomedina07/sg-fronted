import { Navigate, Route, Routes } from 'react-router-dom';
import { Login }                   from '../auth/page/Login';

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={ <Login/> } />
      <Route path="*" element={ <Navigate to="/"/> } />
    </Routes>
  );
};
