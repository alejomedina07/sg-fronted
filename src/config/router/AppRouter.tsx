
import useAuth          from '../../pages/public/auth/redux/hooks/useAuth';
import { PublicRoutes } from '../../pages/public/router/PublicRoutes';
import { AdminRoutes }  from '../../pages/admin/router/AdminRoutes';

export const AppRouter = () => {

  const { authenticated } = useAuth();

  console.log(78, authenticated);

  return (
    <>
      <AdminRoutes/>
      {/* { (authenticated) ? <AdminRoutes/> : <PublicRoutes/> } */}
    </>
  );
}
