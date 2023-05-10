import { BoxLayout, LayoutMain } from '../../../../components/layout/admin';
import { Outlet } from 'react-router-dom';
import { NavItem } from '../../../../components/layout/admin/componets';
import Box from '@mui/material/Box';
import { Card, CardActionArea, CardActions, CardHeader } from '@mui/material';
import { t } from 'i18next';
import { SgLink } from '../../../../components/form/button/SgLink';

export const Admin = () => {
  return (
    <LayoutMain>
      <div className="w-full">
        <BoxLayout>
          <Outlet />
        </BoxLayout>
      </div>
    </LayoutMain>
  );
};
