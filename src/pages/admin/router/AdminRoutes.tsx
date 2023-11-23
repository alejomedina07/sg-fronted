import { Navigate, Route, Routes } from 'react-router-dom';
import { ListUser } from '../user/views/ListUser';
import { Admin } from '../components/layout/Admin';
import { ProtectedRoute } from '../../../components/auth/ProtectedRoute';
import { FormUser } from '../user/views/FormUser';
import { AppointmentView } from '../appointment/views/AppointmentView';
import { ListCustomer } from '../customer/views/ListCustomer';
import { FormCustomer } from '../customer/views/FormCustomer';
import { ListExpense } from '../expense/views/ListExpense';
import { FormExpense } from '../expense/views/FormExpense';
import { ListInventory } from '../inventory/views/ListInventory';
import { FormInventory } from '../inventory/views/FormInventory';
import { ListService } from '../service/views/ListService';
import { FormService } from '../service/views/FormService';
import { ListAppointmentType } from '../config/appointmentType/views/ListAppointmentType';
import { FormAppointmentType } from '../config/appointmentType/views/FormAppointmentType';
import { ConfigOptions } from '../config/configOption/views/ConfigOptions';
import { ReportMain } from '../reports/view/ReportMain';
import { ViewCustomer } from '../customer/views/ViewCustomer';
import { ListOptions } from '../config/configOption/views/ListOptions';
import { FormOptions } from '../config/configOption/views/FormOptions';
import { ViewInventory } from '../inventory/views/ViewInventory';
import { AdminView } from '../components/AdminView';
import useAuth from '../../public/auth/redux/hooks/useAuth';
import { AdminTurnView } from '../turn/view/AdminTurnView';

export const AdminRoutes = () => {
  const { userConnected } = useAuth();
  // console.log(33333, userConnected);

  return (
    <Routes>
      <Route
        path="admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      >
        <Route path="" element={<AdminView />}></Route>
        {userConnected.rol == 'Admin' && (
          <>
            <Route path="appointment-type">
              <Route path="" element={<ListAppointmentType />} />
              <Route path="create" element={<FormAppointmentType />} />
              <Route
                path="edit/:appointmentTypeId"
                element={<FormAppointmentType />}
              />
            </Route>
            <Route path="users">
              <Route path="" element={<ListUser />} />
              <Route path="create" element={<FormUser />} />
              <Route path="edit/:userId" element={<FormUser />} />
            </Route>
            <Route path="config">
              <Route path="config-options" element={<ConfigOptions />} />
              <Route path="config-list/:keyValue" element={<ListOptions />} />
              <Route path="config-form/:keyValue" element={<FormOptions />} />
              <Route
                path="config-edit/:keyValue/:idConfig"
                element={<FormOptions />}
              />
            </Route>
          </>
        )}
        <Route path="customer">
          <Route path="" element={<ListCustomer />} />
          <Route path="create" element={<FormCustomer />} />
          <Route path="edit/:customerId" element={<ViewCustomer />} />
        </Route>
        <Route path="expense">
          <Route path="" element={<ListExpense />} />
          <Route path="create" element={<FormExpense />} />
          <Route path="edit/:expenseId" element={<FormExpense />} />
        </Route>
        <Route path="inventory">
          <Route path="" element={<ListInventory />} />
          <Route path="create" element={<FormInventory />} />
          <Route path="edit/:inventoryId" element={<ViewInventory />} />
        </Route>
        <Route path="service">
          <Route path="" element={<ListService />} />
          <Route path="create" element={<FormService />} />
        </Route>

        <Route path="appointment" element={<AppointmentView />} />
        <Route path="turn" element={<AdminTurnView />} />
        <Route path="report" element={<ReportMain />} />
      </Route>
      <Route path="*" element={<Navigate to="admin" />} />
    </Routes>
  );
};
