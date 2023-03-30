import { Navigate, Route, Routes } from 'react-router-dom';
import { ListUser }                from '../user/views/ListUser';
import { Admin }                   from "../components/layout/Admin";
import { ProtectedRoute }          from "../../../components/auth/ProtectedRoute";
import { FormUser }                from '../user/views/FormUser';
import { AppointmentView }         from '../appointment/views/AppointmentView';
import { ListCustomer }            from '../customer/views/ListCustomer';
import { FormCustomer }            from '../customer/views/FormCustomer';
import {ListExpense} from "../expense/views/ListExpense";
import {FormExpense} from "../expense/views/FormExpense";


export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path='admin' element={ <ProtectedRoute> <Admin /> </ProtectedRoute> }>
        <Route path='users'>
          <Route path='' element={<ListUser />} />
          <Route path='create' element={<FormUser />} />
        </Route>
        <Route path='customer'>
          <Route path='' element={<ListCustomer />} />
          <Route path='create' element={<FormCustomer />} />
        </Route>
          <Route path='expense'>
              <Route path='' element={<ListExpense />} />
              <Route path='create' element={<FormExpense />} />
          </Route>

        <Route path='appointment' element={<AppointmentView />} />
      </Route>
      <Route path="*" element={ <Navigate to="admin"/> } />
    </Routes>
  );
};
