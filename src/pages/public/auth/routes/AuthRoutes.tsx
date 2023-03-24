import { Navigate, Route, Routes } from 'react-router-dom';
import { Login }                   from '../page/Login';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={ <Login/> } />
      <Route path="/*" element={ <Navigate to="/"/> } />
    </Routes>
  );
}
