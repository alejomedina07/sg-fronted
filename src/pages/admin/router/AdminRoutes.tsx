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
          {validatePermission(Application.ALL_APPLICATIONS.configList) && (
            <Route path="" element={<ListAppointmentType />} />
          )}
          {validatePermission(Application.ALL_APPLICATIONS.configCreate) && (
            <Route path="create" element={<FormAppointmentType />} />
          )}
          {validatePermission(Application.ALL_APPLICATIONS.configEdit) && (
            <Route
              path="edit/:appointmentTypeId"
              element={<FormAppointmentType />}
            />
          )}
        </Route>
        <Route path="users">
          {validatePermission(Application.ALL_APPLICATIONS.userList) && (
            <Route path="" element={<ListUser />} />
          )}
          {validatePermission(Application.ALL_APPLICATIONS.userCreate) && (
            <Route path="create" element={<FormUser />} />
          )}
          {validatePermission(Application.ALL_APPLICATIONS.userEdit) && (
            <Route path="edit/:userId" element={<FormUser />} />
          )}
        </Route>
        <Route path="config">
          {validatePermission(Application.ALL_APPLICATIONS.configList) && (
            <>
              <Route path="config-options" element={<ConfigOptions />} />
              <Route path="rol" element={<ConfigRol />} />
            </>
          )}
          {validatePermission(Application.ALL_APPLICATIONS.configCreate) && (
            <Route path="config-list/:keyValue" element={<ListOptions />} />
          )}
          {validatePermission(Application.ALL_APPLICATIONS.configList) && (
            <Route path="config-form/:keyValue" element={<FormOptions />} />
          )}
          {validatePermission(Application.ALL_APPLICATIONS.configEdit) && (
            <Route
              path="config-edit/:keyValue/:idConfig"
              element={<FormOptions />}
            />
          )}
        </Route>
        <Route path="customer">
          {validatePermission(Application.ALL_APPLICATIONS.customerList) && (
            <Route path="" element={<ListCustomer />} />
          )}
          {validatePermission(Application.ALL_APPLICATIONS.customerCreate) && (
            <Route path="create" element={<FormCustomer />} />
          )}
          {validatePermission(Application.ALL_APPLICATIONS.customerEdit) && (
            <Route path="edit/:customerId" element={<ViewCustomer />} />
          )}
        </Route>
        <Route path="expense">
          {validatePermission(Application.ALL_APPLICATIONS.expenseList) && (
            <Route path="" element={<ListExpense />} />
          )}
          {validatePermission(Application.ALL_APPLICATIONS.expenseCreate) && (
            <Route path="create" element={<FormExpense />} />
          )}
          {validatePermission(Application.ALL_APPLICATIONS.expenseEdit) && (
            <Route path="edit/:expenseId" element={<FormExpense />} />
          )}
        </Route>
        <Route path="inventory">
          {validatePermission(Application.ALL_APPLICATIONS.inventoryList) && (
            <Route path="" element={<ListInventory />} />
          )}
          {validatePermission(Application.ALL_APPLICATIONS.inventoryCreate) && (
            <Route path="create" element={<FormInventory />} />
          )}
          {validatePermission(Application.ALL_APPLICATIONS.inventoryEdit) && (
            <Route path="edit/:inventoryId" element={<ViewInventory />} />
          )}
        </Route>
        <Route path="service">
          {validatePermission(Application.ALL_APPLICATIONS.serviceList) && (
            <Route path="" element={<ListService />} />
          )}
          {validatePermission(Application.ALL_APPLICATIONS.serviceCreate) && (
            <Route path="create" element={<FormService />} />
          )}
        </Route>

        {validatePermission(Application.ALL_APPLICATIONS.appointmentList) && (
          <Route path="appointment" element={<AppointmentView />} />
        )}
        {/* {validatePermission(Application.ALL_APPLICATIONS.turnList) && ( */}
        {/*   <Route path="turn" element={<AdminTurnView />} /> */}
        {/* )} */}
        {validatePermission(Application.ALL_APPLICATIONS.reportList) && (
          <Route path="report" element={<ReportMain />} />
        )}
      </Route>
      <Route path="*" element={<Navigate to="admin" />} />
    </Routes>
  );
};
