import GroupIcon        from '@mui/icons-material/Group.js';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { NavItem }      from '../index';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';

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
    id:6, name: 'expense',
    link:'/admin/expense', icon: <AddBusinessIcon/>
  },
  {
    id:7, name: 'inventory',
    link:'/admin/inventory', icon: <PlaylistAddCircleIcon/>
  },
  {
    id:1, name: 'reports',
    link:'/admin/report', icon: <TrendingUpIcon/>
  },
]