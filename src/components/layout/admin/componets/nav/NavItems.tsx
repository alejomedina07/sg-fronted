import GroupIcon        from '@mui/icons-material/Group.js';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { NavItem }      from '../index';

export const navItems:NavItem[] = [
  {
    id:2, name: 'users',
    link:'/admin/users', icon: <GroupIcon/>
  },
  {
    id:3, name: 'add_user',
    link:'/admin/users/create', icon: <GroupAddIcon/>
  },
  {
    id:4, name: 'appointment',
    link:'/admin/appointment', icon: <CalendarMonthIcon/>
  },
  {
    id:5, name: 'customer',
    link:'/admin/customer', icon: <PermContactCalendarIcon/>
  },
  {
    id:6, name: 'customer',
    link:'/admin/report', icon: <TrendingUpIcon/>
  },
]