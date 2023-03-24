import { Navigate, Route, Routes } from 'react-router-dom';
import { ListUser }                from '../user/views/ListUser';
import { Admin }                   from "../components/layout/Admin";
import { ProtectedRoute } from "../../../components/auth/ProtectedRoute";
import { FormUser } from '../user/views/FormUser';


export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='admin' element={ <ProtectedRoute> <Admin /> </ProtectedRoute> }>
        {/* <Route path='users' element={<ListUser />} /> */}
        <Route path='users'>
          <Route path='' element={<ListUser />} />
          <Route path='create' element={<FormUser />} />
        </Route>
      </Route>
      <Route path="*" element={ <Navigate to="admin"/> } />
    </Routes>
  );
};
