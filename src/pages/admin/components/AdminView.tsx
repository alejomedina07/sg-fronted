import { NavItem, navItems } from '../../../components/layout/admin/componets';
import { Paper } from '@mui/material';
import { t } from 'i18next';
import { SgLink } from '../../../components/form/button/SgLink';
import SettingsIcon from '@mui/icons-material/Settings';
import UseAuth from '../../public/auth/redux/hooks/useAuth';

export const AdminView = () => {
  const { userConnected } = UseAuth();
  return (
    <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 xs:gap-1 sm:gap-2 md:gap-3">
      {[
        ...navItems,
        {
          id: 9,
          name: 'config',
          link: '/admin/config/config-options',
          icon: <SettingsIcon />,
          iconMenu: <SettingsIcon sx={{ fontSize: 50 }} />,
          onlyAdmin: true,
        },
      ].map((option: NavItem) => {
        if (userConnected.rol === 'Admin' || !option.onlyAdmin) {
          return (
            <Paper
              elevation={3}
              className="flex-1 h-40 p-2 m-4"
              key={option.id}
            >
              <div className="h-full flex flex-col items-center">
                <b>{t(option.name)}</b>
                <span className="flex-1" />
                <span> {option.iconMenu} </span>
                <span className="flex-1" />
                <SgLink
                  label={t('see')}
                  to={`${option.link}`}
                  classes="w-full"
                />
              </div>
            </Paper>
          );
        }
      })}
    </div>
  );
};
