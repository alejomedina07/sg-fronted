import { AppTheme }           from './config/theme';
import { AppRouter }          from './config/router/AppRouter';
import { ConfirmationDialog } from './components/notifications/confirmation-dialog/ConfirmationDialog'
import { SgSnackbar }         from './components/notifications/snackbar/SgSnackbar';

function App() {
  return (
    <AppTheme>
      <ConfirmationDialog />
      <SgSnackbar />
      <AppRouter/>
    </AppTheme>
  )
}

export default App
