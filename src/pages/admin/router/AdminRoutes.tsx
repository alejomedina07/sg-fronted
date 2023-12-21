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
// import { AdminTurnView } from '../turn/view/AdminTurnView';
import { ApplicationConst } from './cosnts/ApplicationConst';
import { ConfigRol } from '../config/rol/views/ConfigRol';

const Application = new ApplicationConst();

export const AdminRoutes = () => {
  const { userConnected } = useAuth();

  const validatePermission = (permission: string) => {
    return Application.validatePermission(
      permission,
      userConnected.privileges,
      userConnected.rol
    );
  };

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
        <Route path="appointment-type">
          {validatePermission(Application.PRIVILEGES.configList) && (
            <Route path="" element={<ListAppointmentType />} />
          )}
          {validatePermission(Application.PRIVILEGES.configCreate) && (
            <Route path="create" element={<FormAppointmentType />} />
          )}
          {validatePermission(Application.PRIVILEGES.configEdit) && (
            <Route
              path="edit/:appointmentTypeId"
              element={<FormAppointmentType />}
            />
          )}
        </Route>
        <Route path="users">
          {validatePermission(Application.PRIVILEGES.userList) && (
            <Route path="" element={<ListUser />} />
          )}
          {validatePermission(Application.PRIVILEGES.userCreate) && (
            <Route path="create" element={<FormUser />} />
          )}
          {validatePermission(Application.PRIVILEGES.userEdit) && (
            <Route path="edit/:userId" element={<FormUser />} />
          )}
        </Route>
        <Route path="config">
          {validatePermission(Application.PRIVILEGES.configList) && (
            <>
              <Route path="config-options" element={<ConfigOptions />} />
              <Route path="rol" element={<ConfigRol />} />
            </>
          )}
          {validatePermission(Application.PRIVILEGES.configCreate) && (
            <Route path="config-list/:keyValue" element={<ListOptions />} />
          )}
          {validatePermission(Application.PRIVILEGES.configList) && (
            <Route path="config-form/:keyValue" element={<FormOptions />} />
          )}
          {validatePermission(Application.PRIVILEGES.configEdit) && (
            <Route
              path="config-edit/:keyValue/:idConfig"
              element={<FormOptions />}
            />
          )}
        </Route>
        <Route path="customer">
          {validatePermission(Application.PRIVILEGES.customerList) && (
            <Route path="" element={<ListCustomer />} />
          )}
          {validatePermission(Application.PRIVILEGES.customerCreate) && (
            <Route path="create" element={<FormCustomer />} />
          )}
          {validatePermission(Application.PRIVILEGES.customerEdit) && (
            <Route path="edit/:customerId" element={<ViewCustomer />} />
          )}
        </Route>
        <Route path="expense">
          {validatePermission(Application.PRIVILEGES.expenseList) && (
            <Route path="" element={<ListExpense />} />
          )}
          {validatePermission(Application.PRIVILEGES.expenseCreate) && (
            <Route path="create" element={<FormExpense />} />
          )}
          {validatePermission(Application.PRIVILEGES.expenseEdit) && (
            <Route path="edit/:expenseId" element={<FormExpense />} />
          )}
        </Route>
        <Route path="inventory">
          {validatePermission(Application.PRIVILEGES.inventoryList) && (
            <Route path="" element={<ListInventory />} />
          )}
          {validatePermission(Application.PRIVILEGES.inventoryCreate) && (
            <Route path="create" element={<FormInventory />} />
          )}
          {validatePermission(Application.PRIVILEGES.inventoryEdit) && (
            <Route path="edit/:inventoryId" element={<ViewInventory />} />
          )}
        </Route>
        <Route path="service">
          {validatePermission(Application.PRIVILEGES.serviceList) && (
            <Route path="" element={<ListService />} />
          )}
          {validatePermission(Application.PRIVILEGES.serviceCreate) && (
            <Route path="create" element={<FormService />} />
          )}
        </Route>

        {validatePermission(Application.PRIVILEGES.appointmentList) && (
          <Route path="appointment" element={<AppointmentView />} />
        )}
        {/* {validatePermission(Application.PRIVILEGES.turnList) && ( */}
        {/*   <Route path="turn" element={<AdminTurnView />} /> */}
        {/* )} */}
        {validatePermission(Application.PRIVILEGES.reportList) && (
          <Route path="report" element={<ReportMain />} />
        )}
      </Route>
      <Route path="*" element={<Navigate to="admin" />} />
    </Routes>
  );
};
