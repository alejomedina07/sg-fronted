import GroupIcon        from '@mui/icons-material/Group.js';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
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
]