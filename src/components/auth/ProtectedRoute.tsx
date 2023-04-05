import useAuth      from '../../pages/public/auth/redux/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }: any) => {
 // const { authenticated } = useAuth();
 // if (!authenticated) {
//    return <Navigate to="/" replace />;
 // }

  return children;
};
