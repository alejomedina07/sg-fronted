import GroupIcon from '@mui/icons-material/Group.js';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { NavItem } from '../index';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { ApplicationConst } from '../../../../../pages/admin/router/cosnts/ApplicationConst';

const Application = new ApplicationConst();

export const navItems: NavItem[] = [
  {
    id: 2,
    name: 'users',
    link: '/admin/users',
    icon: <GroupIcon />,
    iconMenu: <GroupIcon sx={{ fontSize: 50 }} />,
    onlyAdmin: true,
    privileges: {
      main: Application.PRIVILEGES.userList,
      second: Application.PRIVILEGES.userCreate,
      secondLink: '/admin/users/create',
    },
  },
  {
    id: 4,
    name: 'appointment',
    link: '/admin/appointment',
    icon: <CalendarMonthIcon />,
    iconMenu: <CalendarMonthIcon sx={{ fontSize: 50 }} />,
    onlyAdmin: false,
    privileges: {
      main: Application.PRIVILEGES.appointmentList,
      second: Application.PRIVILEGES.appointmentCreate,
      secondLink: '/admin/appointment',
    },
  },
  {
    id: 5,
    name: 'customer',
    link: '/admin/customer',
    icon: <PermContactCalendarIcon />,
    iconMenu: <PermContactCalendarIcon sx={{ fontSize: 50 }} />,
    onlyAdmin: false,
    privileges: {
      main: Application.PRIVILEGES.customerList,
      second: Application.PRIVILEGES.customerCreate,
      secondLink: '/admin/customer/create',
    },
  },
  {
    id: 6,
    name: 'expense',
    link: '/admin/expense',
    icon: <AddBusinessIcon />,
    iconMenu: <AddBusinessIcon sx={{ fontSize: 50 }} />,
    onlyAdmin: false,
    privileges: {
      main: Application.PRIVILEGES.expenseList,
      second: Application.PRIVILEGES.expenseCreate,
      secondLink: '/admin/expense/create',
    },
  },
  {
    id: 7,
    name: 'inventory',
    link: '/admin/inventory',
    icon: <PlaylistAddCircleIcon />,
    iconMenu: <PlaylistAddCircleIcon sx={{ fontSize: 50 }} />,
    onlyAdmin: false,
    privileges: {
      main: Application.PRIVILEGES.inventoryList,
      second: Application.PRIVILEGES.inventoryCreate,
      secondLink: '/admin/inventory/create',
    },
  },
  {
    id: 8,
    name: 'service',
    link: '/admin/service',
    icon: <MonetizationOnIcon />,
    iconMenu: <MonetizationOnIcon sx={{ fontSize: 50 }} />,
    onlyAdmin: false,
    privileges: {
      main: Application.PRIVILEGES.serviceList,
      second: Application.PRIVILEGES.serviceCreate,
      secondLink: '/admin/service/create',
    },
  },
  {
    id: 1,
    name: 'reports',
    link: '/admin/report',
    icon: <TrendingUpIcon />,
    iconMenu: <TrendingUpIcon sx={{ fontSize: 50 }} />,
    onlyAdmin: true,
    privileges: {
      main: Application.PRIVILEGES.reportList,
      second: Application.PRIVILEGES.reportList,
      secondLink: '/admin/report',
    },
  },
  // {
  //   id: 10,
  //   name: 'turns',
  //   link: '/admin/turn',
  //   icon: <SwipeRightIcon />,
  //   iconMenu: <SwipeRightIcon sx={{ fontSize: 50 }} />,
  //   onlyAdmin: true,
  //   privileges: {
  //     main: Application.PRIVILEGES.turnList,
  //     second: Application.PRIVILEGES.turnCreate,
  //     secondLink: '/admin/turn',
  //   },
  // },
];
