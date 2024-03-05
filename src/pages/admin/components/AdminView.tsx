import { NavItem, navItems } from '../../../components/layout/admin/componets';
import { Paper } from '@mui/material';
import { SgLink } from '../../../components/form/button/SgLink';
import SettingsIcon from '@mui/icons-material/Settings';
import PostAddIcon from '@mui/icons-material/PostAdd';
import UseAuth from '../../public/auth/redux/hooks/useAuth';
import { ApplicationConst } from '../router/consts/ApplicationConst';
import { useTranslation } from 'react-i18next';

const Application = new ApplicationConst();

export const AdminView = () => {
  const { userConnected } = UseAuth();
  const { t } = useTranslation();
  const getPaper = (option: NavItem) => {
    return (
      <Paper
        elevation={3}
        className="flex-1 h-40 p-2 m-4"
        key={`paper-${option.id}`}
      >
        <div className="h-full flex flex-col items-center">
          <b>{t(option.name)}</b>
          <span className="flex-1" />
          <span> {option.iconMenu} </span>
          <span className="flex-1" />
          <SgLink label={t('see')} to={`${option.link}`} classes="w-full" />
        </div>
      </Paper>
    );
  };

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
          privileges: {
            main: 'Admin',
            second: 'Admin',
            secondLink: '/admin/config/config-options',
          },
        },
        {
          id: 13,
          name: 'config_survey',
          link: '/admin/survey/config',
          icon: <PostAddIcon />,
          iconMenu: <PostAddIcon sx={{ fontSize: 50 }} />,
          onlyAdmin: true,
          privileges: {
            main: 'Admin',
            second: 'Admin',
            secondLink: '/admin/survey/config',
          },
        },
      ].map((option: NavItem) => {
        if (
          userConnected.rol === 'Admin' ||
          (!option.onlyAdmin && userConnected.rol === 'User')
        ) {
          return getPaper(option);
        } else {
          const response = Application.validatePrivileges(
            option,
            userConnected.privileges
          );
          if (response?.isValid) {
            option.link = response.link;
            return getPaper(option);
          }
        }
      })}
    </div>
  );
};
