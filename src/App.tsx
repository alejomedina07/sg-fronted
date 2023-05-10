import { AppTheme }              from './config/theme';
import { AppRouter }             from './config/router/AppRouter';
import { ConfirmationDialog }    from './components/notifications/confirmation-dialog/ConfirmationDialog'
import { SgSnackbar }            from './components/notifications/snackbar/SgSnackbar';
import { DialogFormAppointment } from './pages/admin/appointment/components/DialogFormAppointment';
import useAppointment            from './pages/admin/appointment/redux/hooks/useAppointment';
import { DialogService }         from './pages/admin/service/components/DialogService';
import useService                from './pages/admin/service/redux/hooks/useService';



function App() {
  const { isOpenModalAppointment } = useAppointment();
  const { isOpenModalService } = useService();
  return (
    <AppTheme>
      <ConfirmationDialog />
      <SgSnackbar />
      <AppRouter/>
      {!!isOpenModalAppointment && (<DialogFormAppointment />)}
      {!!isOpenModalService && (<DialogService />) }
    </AppTheme>
  )
}

export default App
