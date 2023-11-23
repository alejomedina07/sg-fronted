import GroupIcon from '@mui/icons-material/Group.js';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { NavItem } from '../index';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';

export const navItems: NavItem[] = [
  {
    id: 2,
    name: 'users',
    link: '/admin/users',
    icon: <GroupIcon />,
    iconMenu: <GroupIcon sx={{ fontSize: 50 }} />,
    onlyAdmin: true,
  },
  {
    id: 4,
    name: 'appointment',
    link: '/admin/appointment',
    icon: <CalendarMonthIcon />,
    iconMenu: <CalendarMonthIcon sx={{ fontSize: 50 }} />,
    onlyAdmin: false,
  },
  {
    id: 5,
    name: 'customer',
    link: '/admin/customer',
    icon: <PermContactCalendarIcon />,
    iconMenu: <PermContactCalendarIcon sx={{ fontSize: 50 }} />,
    onlyAdmin: false,
  },
  {
    id: 6,
    name: 'expense',
    link: '/admin/expense',
    icon: <AddBusinessIcon />,
    iconMenu: <AddBusinessIcon sx={{ fontSize: 50 }} />,
    onlyAdmin: false,
  },
  {
    id: 7,
    name: 'inventory',
    link: '/admin/inventory',
    icon: <PlaylistAddCircleIcon />,
    iconMenu: <PlaylistAddCircleIcon sx={{ fontSize: 50 }} />,
    onlyAdmin: false,
  },
  {
    id: 8,
    name: 'service',
    link: '/admin/service',
    icon: <MonetizationOnIcon />,
    iconMenu: <MonetizationOnIcon sx={{ fontSize: 50 }} />,
    onlyAdmin: false,
  },
  {
    id: 1,
    name: 'reports',
    link: '/admin/report',
    icon: <TrendingUpIcon />,
    iconMenu: <TrendingUpIcon sx={{ fontSize: 50 }} />,
    onlyAdmin: true,
  },
  {
    id: 10,
    name: 'turns',
    link: '/admin/turn',
    icon: <SwipeRightIcon />,
    iconMenu: <SwipeRightIcon sx={{ fontSize: 50 }} />,
    onlyAdmin: true,
  },
];
