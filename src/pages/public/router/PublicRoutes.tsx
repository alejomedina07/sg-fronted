import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from '../auth/page/Login';
import { MainTurnView } from '../turn/views/MainTurnView';
import { PreTurn } from '../turn/views/PreTurn';
import { Consultation } from '../turn/views/Consultation';

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/turn" element={<MainTurnView />} />
      <Route path="/consultation-turn" element={<Consultation />} />
      <Route path="/pre-turn" element={<PreTurn />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
