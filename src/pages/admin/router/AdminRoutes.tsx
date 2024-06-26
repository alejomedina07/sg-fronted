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
import { ApplicationConst } from './consts/ApplicationConst';
import { ConfigRol } from '../config/rol/views/ConfigRol';
import { ListSurvey } from '../survey/views/ListSurvey';
import { AnswerSurvey } from '../survey/views/AnswerSurvey';
import { ConfigSurvey } from '../survey/views/ConfigSurvey';
import { TypeTurnList } from '../type-turn/views/TypeTurnList';
import { ListProvider } from '../provider/views/ListProvider';
import { FormProvider } from '../provider/views/FormProvider';
import { EditProvider } from '../provider/views/EditProvider';
import { ListAccountPayable } from '../provider/views/ListAccountPayable';
import { ListPayment } from '../provider/views/ListPayment';
import { EditAccountPayable } from '../provider/views/EditAccountPayable';
import { ListTurnView } from '../turn/view/ListTurnView';
import { FormUpdateProfile } from '../user/views/FormUpdateProfile';
import { ListAttentionView } from '../turn/view/attention/ListAttentionView';
import { ListBannerView } from '../banner/views/ListBannerView';

const Application = new ApplicationConst();

export const AdminRoutes = () => {
  const { userConnected } = useAuth();

  const validatePermission = (
    permission: string | string[],
    sectionUser: boolean
  ) => {
    return Application.validatePermission(
      permission,
      userConnected.privileges,
      userConnected.rol,
      sectionUser
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
        <Route path="profile" element={<FormUpdateProfile />}></Route>
        <Route path="appointment-type">
          {validatePermission(Application.PRIVILEGES.configList, false) && (
            <Route path="" element={<ListAppointmentType />} />
          )}
          {validatePermission(Application.PRIVILEGES.configCreate, false) && (
            <Route path="create" element={<FormAppointmentType />} />
          )}
          {validatePermission(Application.PRIVILEGES.configEdit, false) && (
            <Route
              path="edit/:appointmentTypeId"
              element={<FormAppointmentType />}
            />
          )}
        </Route>
        <Route path="banner">
          {validatePermission(Application.PRIVILEGES.bannerList, false) && (
            <Route path="" element={<ListBannerView />} />
          )}
        </Route>
        <Route path="users">
          {validatePermission(Application.PRIVILEGES.userList, false) && (
            <Route path="" element={<ListUser />} />
          )}
          {validatePermission(Application.PRIVILEGES.userCreate, false) && (
            <Route path="create" element={<FormUser />} />
          )}
          {validatePermission(Application.PRIVILEGES.userEdit, false) && (
            <Route path="edit/:userId" element={<FormUser />} />
          )}
        </Route>
        <Route path="config">
          {validatePermission(Application.PRIVILEGES.configList, false) && (
            <>
              <Route path="config-options" element={<ConfigOptions />} />
              <Route path="rol" element={<ConfigRol />} />
            </>
          )}
          {validatePermission(Application.PRIVILEGES.configCreate, false) && (
            <Route path="config-list/:keyValue" element={<ListOptions />} />
          )}
          {validatePermission(Application.PRIVILEGES.configList, false) && (
            <Route path="config-form/:keyValue" element={<FormOptions />} />
          )}
          {validatePermission(Application.PRIVILEGES.configEdit, false) && (
            <Route
              path="config-edit/:keyValue/:idConfig"
              element={<FormOptions />}
            />
          )}
        </Route>
        <Route path="customer">
          {validatePermission(Application.PRIVILEGES.customerList, true) && (
            <Route path="" element={<ListCustomer />} />
          )}
          {validatePermission(Application.PRIVILEGES.customerCreate, true) && (
            <Route path="create" element={<FormCustomer />} />
          )}
          {validatePermission(Application.PRIVILEGES.customerEdit, false) && (
            <Route path="edit/:customerId" element={<ViewCustomer />} />
          )}
        </Route>
        <Route path="expense">
          {validatePermission(Application.PRIVILEGES.expenseList, true) && (
            <Route path="" element={<ListExpense />} />
          )}
          {validatePermission(Application.PRIVILEGES.expenseCreate, true) && (
            <Route path="create" element={<FormExpense />} />
          )}
          {validatePermission(Application.PRIVILEGES.expenseEdit, false) && (
            <Route path="edit/:expenseId" element={<FormExpense />} />
          )}
        </Route>
        <Route path="inventory">
          {validatePermission(Application.PRIVILEGES.inventoryList, false) && (
            <Route path="" element={<ListInventory />} />
          )}
          {validatePermission(
            Application.PRIVILEGES.inventoryCreate,
            false
          ) && <Route path="create" element={<FormInventory />} />}
          {validatePermission(Application.PRIVILEGES.inventoryEdit, false) && (
            <Route path="edit/:inventoryId" element={<ViewInventory />} />
          )}
        </Route>
        <Route path="service">
          {validatePermission(Application.PRIVILEGES.serviceList, true) && (
            <Route path="" element={<ListService />} />
          )}
          {validatePermission(Application.PRIVILEGES.serviceCreate, true) && (
            <Route path="create" element={<FormService />} />
          )}
        </Route>

        {validatePermission(Application.PRIVILEGES.appointmentList, true) && (
          <Route path="appointment" element={<AppointmentView />} />
        )}
        {validatePermission(
          [
            Application.PRIVILEGES.turnList,
            Application.PRIVILEGES.attentionCreate,
          ],
          true
        ) && <Route path="turn" element={<AdminTurnView />} />}
        {validatePermission(Application.PRIVILEGES.turnList, false) && (
          <Route path="turn-list" element={<ListTurnView />} />
        )}
        {validatePermission(Application.PRIVILEGES.attentionList, false) && (
          <Route path="attentions" element={<ListAttentionView />} />
        )}

        {validatePermission(Application.PRIVILEGES.reportList, false) && (
          <Route path="report" element={<ReportMain />} />
        )}
        {/* {validatePermission(Application.PRIVILEGES.surveyList) && ( */}
        {/*   <Route path="survey" element={<ListSurvey />} /> */}
        {/* )} */}

        <Route path="survey">
          {validatePermission(Application.PRIVILEGES.surveyList, true) && (
            <Route path="" element={<ListSurvey />} />
          )}
          {validatePermission(Application.PRIVILEGES.surveyCreate, true) && (
            <Route path="create" element={<AnswerSurvey />} />
          )}
          {validatePermission(Application.PRIVILEGES.surveyAdmin, false) && (
            <Route path="config" element={<ConfigSurvey />} />
          )}
        </Route>

        <Route path="type-turn">
          {validatePermission(Application.PRIVILEGES.typeTurnList, true) && (
            <Route path="" element={<TypeTurnList />} />
          )}
          {/* {validatePermission(Application.PRIVILEGES.procedureCreate, true) && ( */}
          {/*   <Route path="create" element={<TypeTurnList />} /> */}
          {/* )} */}
        </Route>
        <Route path="providers">
          {validatePermission(Application.PRIVILEGES.providerList, false) && (
            <Route path="" element={<ListProvider />} />
          )}
          {validatePermission(Application.PRIVILEGES.providerCreate, false) && (
            <Route path="create" element={<FormProvider />} />
          )}
          {validatePermission(Application.PRIVILEGES.providerEdit, false) && (
            <Route path="edit/:providerId" element={<EditProvider />} />
          )}
          {validatePermission(
            Application.PRIVILEGES.accountPayableList,
            false
          ) && (
            <Route path="account-payable" element={<ListAccountPayable />} />
          )}
          {validatePermission(
            Application.PRIVILEGES.accountPayableList,
            false
          ) && (
            <Route
              path="account-payable/:accountPayableId"
              element={<EditAccountPayable />}
            />
          )}
          {validatePermission(Application.PRIVILEGES.paymentList, false) && (
            <Route path="payment" element={<ListPayment />} />
          )}
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="admin" />} />
    </Routes>
  );
};
