import useAuth from '../../pages/public/auth/redux/hooks/useAuth';
import { PublicRoutes } from '../../pages/public/router/PublicRoutes';
import { AdminRoutes } from '../../pages/admin/router/AdminRoutes';
import { Navigate, Route, Routes } from 'react-router-dom';

export const AppRouter = () => {
  const { authenticated } = useAuth();

  return (
    <Routes>
      {authenticated ? (
        <Route path="/*" element={<AdminRoutes />} />
      ) : (
        <Route path="/*" element={<PublicRoutes />} />
      )}
      {/* Otras rutas públicas o privadas según sea necesario */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    // <>
    //   { (authenticated) ? <AdminRoutes /> : <PublicRoutes /> }
    // </>
  );
};
