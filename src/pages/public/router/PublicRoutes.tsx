import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../auth/page/Login';
// import { MainTurnView } from '../turn/views/MainTurnView';

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* <Route path="/turn" element={<MainTurnView />} /> */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
