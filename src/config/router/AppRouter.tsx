import useAuth from '../../pages/public/auth/redux/hooks/useAuth';
import { PublicRoutes } from '../../pages/public/router/PublicRoutes';
import { AdminRoutes } from '../../pages/admin/router/AdminRoutes';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IndexPage } from '../../pages/public/index/indexPage';
import { AnswerAnonymous } from '../../pages/public/survey/AnswerAnonymous';

export const AppRouter = () => {
  const { authenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      {authenticated ? (
        <Route path="/*" element={<AdminRoutes />} />
      ) : (
        <Route path="/*" element={<PublicRoutes />} />
      )}
      {/* Otras rutas públicas o privadas según sea necesario */}
      <Route path="/survey/:idSurvey" element={<AnswerAnonymous />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
